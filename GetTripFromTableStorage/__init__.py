import logging
import json
import azure.functions as func
from azure.cosmosdb.table.tableservice import TableService


def sort_trip(trip_structure: dict) -> dict:
    sorted_trip = {k: v for k, v in sorted(
        trip_structure.items(), key=lambda x: x[0][2])}
    return sorted_trip


def aggregate_by_trip(results) -> dict:
    trip_structure = {}
    for result in results:
        del result['etag']
        del result['Timestamp']
        if result['trip_name'] in trip_structure:
            trip_structure[result['trip_name']
                           ]['approved'] += int(result['approved'])
            trip_structure[result['trip_name']
                           ]['items'] += eval(result['items'])
            trip_structure[result['trip_name']
                           ]['total'] += float(result['total'])
        else:
            relevantData = {
                'PartitionKey': result['PartitionKey'],
                'approved': int(result['approved']),
                'start_date': result['start_date'],
                'end_date': result['end_date'],
                'starting_location': result['starting_location'],
                'main_location': result['main_location'],
                'total': float(result['total']),
                'items': eval(result['items']),
                'status': result['status']
            }
            trip_structure[result['trip_name']] = relevantData
    return trip_structure


def get_trip_from_table_storage(account_name: str, account_key: str, protocol: str,
                                table_endpoint: str, accountId: str) -> [dict]:
    table_service = TableService(
        account_name=account_name, account_key=account_key)

    connection_string = "DefaultEndpointsProtocol={};AccountName={};AccountKey={};TableEndpoint={};".format(
        protocol, account_name, account_key, table_endpoint)

    table_service = TableService(endpoint_suffix="table.cosmos.azure.com",
                                 connection_string=connection_string)

    query_string: str = "PartitionKey eq '{accountId}'".format(
        accountId=accountId)
    result = table_service.query_entities(
        table_name='prod', filter=query_string)
    return result


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('GetTripFromTableStorage request.')
    account_name: str = 'expensely-db'
    account_key: str = 'nSXLSU2AhgZqHCPxmdouuP5uaDApnVuyPihIpoZkf8CbhHFIZNnakSKXObVhumv1ogQJPplSMKFVwvvI0S9adA=='
    protocol: str = 'https'
    table_endpoint: str = 'https://expensely-db.table.cosmos.azure.com:443/'

    accountId: str = ''

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        accountId = req_body.get('accountId')

    if accountId != '':
        results = get_trip_from_table_storage(account_name=account_name, account_key=account_key, protocol=protocol,
                                              table_endpoint=table_endpoint, accountId=accountId)
        aggregated_results = aggregate_by_trip(results)
        sorted_results = sort_trip(aggregated_results)
        return func.HttpResponse(status_code=200, body=json.dumps(sorted_results))

    else:
        return func.HttpResponse(
            "Please pass a name on the query string or in the request body",
            status_code=400
        )


if __name__ == "__main__":
    account_name: str = 'expensely-db'
    account_key: str = 'nSXLSU2AhgZqHCPxmdouuP5uaDApnVuyPihIpoZkf8CbhHFIZNnakSKXObVhumv1ogQJPplSMKFVwvvI0S9adA=='
    protocol: str = 'https'
    table_endpoint: str = 'https://expensely-db.table.cosmos.azure.com:443/'

    accountId: str = '62f5f6aa-44ea-41f0-a856-5b80a6120d9f'
    results = get_trip_from_table_storage(account_name=account_name, account_key=account_key, protocol=protocol,
                                          table_endpoint=table_endpoint, accountId=accountId)
    aggregated_results = aggregate_by_trip(results)
    sorted_results = sort_trip(aggregated_results)
    print(sorted_results)
