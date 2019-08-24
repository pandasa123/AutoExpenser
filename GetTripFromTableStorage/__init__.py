import logging
import json
import azure.functions as func
from azure.cosmosdb.table.tableservice import TableService


def get_trip_from_table_storage(account_name: str, account_key: str, protocol: str,
                                table_endpoint: str, accountId: str, trip_name: str) -> [dict]:
    table_service = TableService(
        account_name=account_name, account_key=account_key)

    connection_string = "DefaultEndpointsProtocol={};AccountName={};AccountKey={};TableEndpoint={};".format(
        protocol, account_name, account_key, table_endpoint)

    table_service = TableService(endpoint_suffix="table.cosmos.azure.com",
                                 connection_string=connection_string)

    query_string: str = "PartitionKey eq '{accountId}' and trip_name eq '{trip}'".format(
        accountId=accountId, trip=trip_name)
    return table_service.query_entities(table_name='prod', filter=query_string)


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('GetTripFromTableStorage request.')
    account_name: str = 'expensely-db'
    account_key: str = 'nSXLSU2AhgZqHCPxmdouuP5uaDApnVuyPihIpoZkf8CbhHFIZNnakSKXObVhumv1ogQJPplSMKFVwvvI0S9adA=='
    protocol: str = 'https'
    table_endpoint: str = 'https://expensely-db.table.cosmos.azure.com:443/'

    accountId: str = ''
    trip_name: str = ''

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        accountId = req_body.get('accountId')
        trip_name = req_body.get('trip_name')

    if accountId != '' and trip_name != '':
        # for result in results:
        #     for (key, value) in result.items():
        #         print(key, value, ' ')
        results = get_trip_from_table_storage(account_name=account_name, account_key=account_key, protocol=protocol,
                                              table_endpoint=table_endpoint, accountId=accountId, trip_name=trip_name)
        return func.HttpResponse(status_code=200, body=json.dumps(results))

    else:
        return func.HttpResponse(
            "Please pass a name on the query string or in the request body",
            status_code=400
        )
