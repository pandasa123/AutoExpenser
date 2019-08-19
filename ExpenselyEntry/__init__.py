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


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    img_data = ''
    blob_name = ''

    url: dict = {
        'upload_to_blob': 'https://expensely.azurewebsites.net/api/UploadToBlobStorage',
        'analyse_receipt_from_URL': 'https://expensely.azurewebsites.net/api/AnalyseReceiptFromURL'
    }

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        img_data = req_body.get('img_data')
        blob_name = req_body.get('blob_name')

    if img_data != '' and blob_name != '':
        blob_loc: str = call_upload_service(
            service_url=url['upload_to_blob'], blob_name=blob_name, img_data=img_data)

        report = call_analysis_service(
            service_url=url['analyse_receipt_from_URL'], blob_url=blob_loc)

        db_info = {'receipt_loc': blob_loc,
                   'items': report['items'], 'total': report['total']}

        return func.HttpResponse(status_code=200, body=json.dumps(db_info))
    else:
        return func.HttpResponse(
            "Please pass a base64 encoded img_data and blob_name in the request body",
            status_code=400
        )


# if __name__ == "__main__":

    # HOST = 'https://expensely.azurewebsites.net'
    # HOST = 'http://localhost:7071'
    # url: dict = {
    #     'upload_to_blob': HOST+'/api/UploadToBlobStorage',
    #     'analyse_receipt_from_URL': HOST+'/api/AnalyseReceiptFromURL'
    # }

    # filename: str = 'IMG_0710.jpg'
    # img_data: str = img_filesystem_to_bytes('Test/'+filename)

    # data: dict = {'blob_name': filename, 'img_data': img_data}

    # print('Uploading')

    # blob_loc: str = call_upload_service(
    #     service_url=url['upload_to_blob'], input_data=data)

    # print('Blob stored at {}'.format(blob_loc))
    # print('Analysing')

    # report = call_analysis_service(
    #     service_url=url['analyse_receipt_from_URL'], blob_url=blob_loc)

    # print('Analysis complete')

    # db_info = {'receipt_loc': blob_loc,
    #            'items': report['items'], 'total': report['total']}

    # db_info = {'receipt_loc': 'https://expensely.blob.core.windows.net/test-expensely/IMG_0710.jpg',
    #            'items': [{'Austin,': 787119.0}], 'total': 5.99}

    # print(db_info)

    # table_service =
