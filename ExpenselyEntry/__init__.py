import logging
import azure.functions as func
import json
import requests

# Remove
import base64


# Remove
def img_filesystem_to_bytes(img: str) -> bytes:
    """Load image from filesystem and encode to base64"""
    encoded_string: bytes = ""
    f = open(img, 'rb')
    encoded_string = base64.b64encode(f.read())
    f.close()
    return encoded_string.decode('utf-8')


def call_upload_service(service_url: str, img_data: str, blob_name: str) -> str:
    """Call UploadToBlob microservice and return URL"""
    input_data: dict = {
        'img_data': img_data,
        'blob_name': blob_name
    }
    r = requests.post(url=service_url, json=input_data)
    body = r.json()
    return body['url']


def call_analysis_service(service_url: str, blob_url: str):
    """Call Receipt Analysis microservice and return report"""
    input_data: dict = {'fileURL': blob_url}
    r = requests.post(url=service_url, json=input_data)
    body = r.json()
    return body


def call_storage_service(service_url: str, username: str, trip_name: str, blob_loc: str, report: dict):
    """Call Storage Service"""
    db_store = {"username": username, "trip_name": trip_name, "receipt_loc": blob_loc,
                "items": report['items'], 'total': report['total']}
    r = requests.post(url=service_url, json=db_store)
    body = r.json()
    return body


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Expensely Sequence request.')

    img_data = ''
    blob_name = ''
    username = ''
    trip_name = ''

    HOST='https://expensely.azurewebsites.net'
    # HOST='http://localhost:7071'
    
    url: dict = {
        'upload_to_blob': HOST+'/api/UploadToBlobStorage',
        'analyse_receipt_from_URL': HOST+'/api/AnalyseReceiptFromURL',
        'store_into_table': HOST+'/api/StoreIntoTableStorage'
    }

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        img_data = req_body.get('img_data')
        blob_name = req_body.get('blob_name')
        username = req_body.get('username')
        trip_name = req_body.get('trip_name')

    if img_data != '' and blob_name != '' and username != '' and trip_name != '':
        blob_loc: str = call_upload_service(
            service_url=url['upload_to_blob'], blob_name=blob_name, img_data=img_data)

        report = call_analysis_service(
            service_url=url['analyse_receipt_from_URL'], blob_url=blob_loc)

        table_upload = call_storage_service(
            service_url=url['store_into_table'], username=username, trip_name=trip_name, blob_loc=blob_loc, report=report)

        return func.HttpResponse(status_code=200, body=json.dumps(table_upload))
    else:
        return func.HttpResponse(
            "Please pass a base64 encoded img_data, blob_name, username, and trip_name in the request body",
            status_code=400
        )
