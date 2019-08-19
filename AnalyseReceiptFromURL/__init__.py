import logging
import azure.functions as func
import json
import http.client
import urllib.request
import urllib.parse
import urllib.error
import base64
import time


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


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # fileURL = r'https://expensely.blob.core.windows.net/test-expensely/IMG_0709.JPG'

    fileURL = ''

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        fileURL = req_body.get('fileURL')

    endpoint = r'receiptcv.cognitiveservices.azure.com'
    subscription_key = r'a9b7738d8ee4489eba0c400015a840c2'
    report = analysis_engine(endpoint=endpoint,
                             fileURL=fileURL,
                             key=subscription_key)

    if fileURL != '':
        return func.HttpResponse(status_code=200, body=json.dumps(report))
    else:
        return func.HttpResponse(
            "Please pass a fileURL in the request body",
            status_code=400
        )
