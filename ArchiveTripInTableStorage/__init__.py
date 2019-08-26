import logging
import json
import azure.functions as func
from azure.cosmosdb.table.tableservice import TableService


def get_entities(table_service: TableService, accountId: str, tripName: str) -> []:
    entities = []
    query_string: str = "PartitionKey eq '{accountId}' and trip_name eq '{tripName}'".format(
        accountId=accountId, tripName=tripName)
    results = table_service.query_entities(
        table_name='prod', filter=query_string)

    for result in results:
        entities.append(result)

    return entities


def update_entity_state(table_service: TableService, accountId: str, tripName: str, entityList: [], table_name: str):
    for entity in entityList:
        entity['status'] = 'archived'
        table_service.update_entity(table_name, entity)


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('ArchiveTripInStorage request.')
    account_name: str = 'expensely-db'
    account_key: str = 'nSXLSU2AhgZqHCPxmdouuP5uaDApnVuyPihIpoZkf8CbhHFIZNnakSKXObVhumv1ogQJPplSMKFVwvvI0S9adA=='
    protocol: str = 'https'
    table_endpoint: str = 'https://expensely-db.table.cosmos.azure.com:443/'

    accountId: str = ''
    tripName: str = ''

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        accountId = req_body.get('accountId')
        tripName = req_body.get('trip_name')

    if accountId != '' and tripName != '':
        table_service = TableService(
            account_name=account_name, account_key=account_key)

        connection_string = "DefaultEndpointsProtocol={};AccountName={};AccountKey={};TableEndpoint={};".format(
            protocol, account_name, account_key, table_endpoint)

        table_service = TableService(endpoint_suffix="table.cosmos.azure.com",
                                     connection_string=connection_string)

        entities = get_entities(table_service=table_service,
                                accountId=accountId, tripName=tripName)

        update_entity_state(table_service=table_service, table_name='prod',
                            accountId=accountId, tripName=tripName, entityList=entities)

        return func.HttpResponse(status_code=200)

    else:
        return func.HttpResponse(
            "Please pass accountId and trip_name in the request body",
            status_code=400
        )


if __name__ == "__main__":
    account_name: str = 'expensely-db'
    account_key: str = 'nSXLSU2AhgZqHCPxmdouuP5uaDApnVuyPihIpoZkf8CbhHFIZNnakSKXObVhumv1ogQJPplSMKFVwvvI0S9adA=='
    protocol: str = 'https'
    table_endpoint: str = 'https://expensely-db.table.cosmos.azure.com:443/'

    accountId: str = '62f5f6aa-44ea-41f0-a856-5b80a6120d9f'
    tripName: str = 'Face-to-Face Team Meeting'

    table_service = TableService(
        account_name=account_name, account_key=account_key)

    connection_string = "DefaultEndpointsProtocol={};AccountName={};AccountKey={};TableEndpoint={};".format(
        protocol, account_name, account_key, table_endpoint)

    table_service = TableService(endpoint_suffix="table.cosmos.azure.com",
                                 connection_string=connection_string)

    entities = get_entities(table_service=table_service,
                            accountId=accountId, tripName=tripName)

    update_entity_state(table_service=table_service, table_name='prod',
                        accountId=accountId, tripName=tripName, entityList=entities)
