import logging

import azure.functions as func
from azure.cosmosdb.table.tableservice import TableService
import json


def store_in_table_storage(account_name: str, account_key: str, data: dict):
    protocol: str = 'https'
    table_endpoint: str = 'https://expensely-db.table.cosmos.azure.com:443/'

    table_service = TableService(
        account_name=account_name, account_key=account_key)

    connection_string = "DefaultEndpointsProtocol={};AccountName={};AccountKey={};TableEndpoint={};".format(
        protocol, account_name, account_key, table_endpoint)

    table_service = TableService(endpoint_suffix="table.cosmos.azure.com",
                                 connection_string=connection_string)

    table_service.insert_entity('prod', data)


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Expensely Table Storage request.')

    items = ''
    total = ''
    receipt_loc = ''
    username = ''
    trip_name = ''

    account_name: str = 'expensely-db'
    account_key: str = 'nSXLSU2AhgZqHCPxmdouuP5uaDApnVuyPihIpoZkf8CbhHFIZNnakSKXObVhumv1ogQJPplSMKFVwvvI0S9adA=='

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        receipt_loc = req_body.get('receipt_loc')
        username = req_body.get('username')
        trip_name = req_body.get('trip_name')
        items = req_body.get('items')
        total = req_body.get('total')

    if items != '' and total != '' and receipt_loc != '' and username != '' and trip_name != '':

        store_receipt: dict = {
            'PartitionKey': username,
            'RowKey': receipt_loc,
            'trip_name': trip_name,
            'items': str(items),
            'total': total,
            'approved': '0',
            'status': 'Not Reviewed'
        }

        store_in_table_storage(account_name=account_name,
                               account_key=account_key, data=store_receipt)

        return func.HttpResponse(status_code=200, body=json.dumps(store_receipt))
    else:
        return func.HttpResponse(
            "Please pass username, trip_name, receipt_loc, items, and total in the request body",
            status_code=400
        )
