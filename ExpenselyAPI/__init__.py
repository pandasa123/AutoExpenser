import logging
import azure.functions as func
import requests
import logging
import os
import base64
from azure.storage.common.models import ListGenerator as ListGeneratorType
import json
import http.client
import urllib.request
import urllib.parse
import urllib.error
import base64
import time
from azure.cosmosdb.table.tableservice import TableService


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


def analyse_receipt(fileURL: str, headers: dict, endpoint: str) -> str:
    """
        Analyse receipt (via URL) and store result in operation-location.
        Needs to be more flexible for batch analysis in the future
    """
    body = json.dumps({"url": fileURL})
    try:
        conn = http.client.HTTPSConnection(endpoint)
        conn.request(
            "POST", "/formrecognizer/v1.0-preview/prebuilt/receipt/asyncBatchAnalyze", body, headers)
        response = conn.getresponse()
        # data = response.read()
        operationURL = "" + response.getheader("Operation-Location")
        conn.close()
    except Exception as e:
        print(e)
        exit()
    return operationURL


def get_analysis_report(operationID: str, headers: dict, endpoint: str) -> dict:
    """Gets analysis report json via operationID"""
    conn = http.client.HTTPSConnection(endpoint)
    while True:
        try:
            conn.request(
                "GET", f"/formrecognizer/v1.0-preview/prebuilt/receipt/operations/{operationID}", "", headers)
            responseString = conn.getresponse().read().decode('utf-8')
            responseDict = json.loads(responseString)
            conn.close()
            if 'status' in responseDict and responseDict['status'] not in ['NotStarted', 'Running']:
                break
            time.sleep(1)
        except Exception as e:
            print(e)
            exit()
    return responseDict


def is_float(s: str) -> bool:
    """Use float / ValueError to determine if str is float"""
    try:
        float(s)
        return True
    except ValueError:
        return False


def parse_items(possible_items: []) -> []:
    """Parse items from array"""
    items = []
    for i in range(len(possible_items)):
        # Stop early if we hit "Total"
        if 'Total' in possible_items[i] or 'total' in possible_items[i]:
            return items
        if(is_float(possible_items[i])):
            items.append({possible_items[i-1]: float(possible_items[i])})
    return items


def get_items_from_receipt_data(data: dict) -> []:
    """Get items from json data"""
    possible_items = []
    for line in data['recognitionResults'][0]['lines']:
        possible_items.append(line['text'])

    return parse_items(possible_items)


def get_total_from_receipt_data(data: dict) -> str:
    """Get total from json data"""
    return data['understandingResults'][0]['fields']['Total']['value']


def analysis_engine(endpoint: str, fileURL: str, key: str) -> dict:
    """
        Get single report per image. We can probably utilse batch by reading the API closer
        Endpoint and key will probably be set in bound parameters
        fileURL will be passed in API request
    """
    headers = {
        # Request headers
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': key,
    }

    operationURL = analyse_receipt(
        fileURL=fileURL, headers=headers, endpoint=endpoint)

    operationId = operationURL.split("operations/")[1]
    data = get_analysis_report(operationID=operationId,
                               headers=headers, endpoint=endpoint)

    items = get_items_from_receipt_data(data)
    total = get_total_from_receipt_data(data)
    return {"items": items, "total": total}


def call_analysis_service(service_url: str, blob_url: str):
    """Call Receipt Analysis microservice and return report"""
    input_data: dict = {'fileURL': blob_url}
    r = requests.post(url=service_url, json=input_data)
    body = r.json()
    return body


def call_storage_service(service_url: str, accountID: str, trip_name: str, blob_loc: str, report: dict):
    """Call Storage Service"""
    db_store = {"accountID": accountID, "trip_name": trip_name, "receipt_loc": blob_loc,
                "items": report['items'], 'total': report['total']}
    r = requests.post(url=service_url, json=db_store)
    body = r.json()
    return body


def get_policy_details(company_name: str) -> dict:
    account_name: str = 'expensely-db'
    account_key: str = 'nSXLSU2AhgZqHCPxmdouuP5uaDApnVuyPihIpoZkf8CbhHFIZNnakSKXObVhumv1ogQJPplSMKFVwvvI0S9adA=='
    protocol: str = 'https'
    table_endpoint: str = 'https://expensely-db.table.cosmos.azure.com:443/'

    table_service = TableService(
        account_name=account_name, account_key=account_key)

    connection_string = "DefaultEndpointsProtocol={};AccountName={};AccountKey={};TableEndpoint={};".format(
        protocol, account_name, account_key, table_endpoint)

    table_service = TableService(endpoint_suffix="table.cosmos.azure.com",
                                 connection_string=connection_string)

    query_string: str = "PartitionKey eq '{company_name}'".format(
        company_name=company_name)
    policies = table_service.query_entities(
        table_name='company-policies', filter=query_string)

    for policy in policies:
        return policy

    return {}


def review_items(items: [], total: float, policy: dict) -> dict:
    approved_total: float = 0.0
    num_approved: int = 0
    if 'max_item_price' in policy:
        for item in items:
            for key, value in item.items():
                if float(policy['max_item_price']) >= value:
                    num_approved += 1
                    approved_total += value
    if 'total_meal_price' in policy:
        if approved_total > float(policy['total_meal_price']):
            approved_total = float(policy['total_meal_price'])

    return {
        'num_approved': num_approved,
        'approved_total': round(approved_total, 2)
    }


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Expensely Sequence request.')

    blob_loc: str = ''
    blob_name: str = ''
    accountID: str = ''
    company_name: str = ''
    trip_name: str = ''
    start_date = ''
    end_date = ''
    starting_location: str = ''
    main_location: str = ''

    # Computer Vision
    cv_endpoint = r'receiptcv.cognitiveservices.azure.com'
    cv_subscription_key = r'a9b7738d8ee4489eba0c400015a840c2'

    # Table Storage
    ts_account_name: str = 'expensely-db'
    ts_account_key: str = 'nSXLSU2AhgZqHCPxmdouuP5uaDApnVuyPihIpoZkf8CbhHFIZNnakSKXObVhumv1ogQJPplSMKFVwvvI0S9adA=='

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        blob_loc = req_body.get('blob_loc')
        blob_name = req_body.get('blob_name')
        accountID = req_body.get('accountID')
        trip_name = req_body.get('trip_name')
        company_name = req_body.get('company_name')
        start_date = req_body.get('start_date')
        end_date = req_body.get('end_date')
        starting_location = req_body.get('starting_location')
        main_location = req_body.get('main_location')

    if blob_loc != '' and blob_name != '' and accountID != '' and trip_name != '' and start_date != '' and end_date != '' and starting_location != '' and main_location != '' and company_name != '':

        report = analysis_engine(endpoint=cv_endpoint,
                                 fileURL=blob_loc, key=cv_subscription_key)

        company_policy = get_policy_details(company_name=company_name)

        reviewed_items = review_items(
            items=report['items'], total=report['total'], policy=company_policy)

        store_receipt: dict = {
            'PartitionKey': accountID,
            'RowKey': blob_name+'@'+trip_name,
            'blob_loc': blob_loc,
            'trip_name': trip_name,
            'company_name': company_name,
            'start_date': start_date,
            'end_date': end_date,
            'starting_location': starting_location,
            'main_location': main_location,
            'items': str(report['items']),
            'total': report['total'],
            'approved': (reviewed_items['approved_total']),
            'num_approved': (reviewed_items['num_approved']),
            'status': 'Reviewed'
        }

        store_in_table_storage(account_name=ts_account_name,
                               account_key=ts_account_key, data=store_receipt)

        return func.HttpResponse(status_code=200, body=json.dumps(store_receipt))
    else:
        return func.HttpResponse(
            "Please pass a blob_loc, blob_name, accountID, trip_name, company_name, start_date, end_date, starting_location, main_location in the request body",
            status_code=400
        )


if __name__ == "__main__":

   # Computer Vision
    cv_endpoint = r'receiptcv.cognitiveservices.azure.com'
    cv_subscription_key = r'a9b7738d8ee4489eba0c400015a840c2'

    # Table Storage
    ts_account_name: str = 'expensely-db'
    ts_account_key: str = 'nSXLSU2AhgZqHCPxmdouuP5uaDApnVuyPihIpoZkf8CbhHFIZNnakSKXObVhumv1ogQJPplSMKFVwvvI0S9adA=='

    blob_loc = 'https://expensely.blob.core.windows.net/test-expensely/IMG_0709.JPG'
    blob_name = '62f5f6aa-44ea-41f0-a856-5b80a6120d9f@Production Review@IMG_0705.jpg@Production Review'
    accountID = '62f5f6aa-44ea-41f0-a856-5b80a6120d9f'
    trip_name = 'Production Review'
    company_name = 'Microsoft'
    start_date = '2019-07-09T04:00:00.000Z'
    end_date = '2019-07-12T04:00:00.000Z'
    starting_location = 'Amsterdam'
    main_location = 'Moscow'

    if blob_loc != '' and blob_name != '' and accountID != '' and trip_name != '' and start_date != '' and end_date != '' and starting_location != '' and main_location != '' and company_name != '':

        report = analysis_engine(endpoint=cv_endpoint,
                                 fileURL=blob_loc, key=cv_subscription_key)

        company_policy = get_policy_details(company_name=company_name)

        reviewed_items = review_items(
            items=report['items'], total=report['total'], policy=company_policy)

        store_receipt: dict = {
            'PartitionKey': accountID,
            'RowKey': blob_name+'@'+trip_name,
            'blob_loc': blob_loc,
            'trip_name': trip_name,
            'company_name': company_name,
            'start_date': start_date,
            'end_date': end_date,
            'starting_location': starting_location,
            'main_location': main_location,
            'items': str(report['items']),
            'total': report['total'],
            'approved': (reviewed_items['approved_total']),
            'num_approved': (reviewed_items['num_approved']),
            'status': 'Reviewed'
        }
        import pprint
        pp = pprint.PrettyPrinter(indent=2)
        pp.pprint(store_receipt)
