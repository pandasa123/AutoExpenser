import logging
import azure.functions as func
import os
import base64
from azure.storage.blob import BlockBlobService, PublicAccess
from azure.storage.common.models import ListGenerator as ListGeneratorType
import json


def list_all_blobs(blobService: BlockBlobService, container_name: str) -> []:
    """Generate list of blob names in Azure Blob Storage Container"""
    names = []
    blobs: ListGeneratorType = blobService.list_blobs(container_name)
    for blob in blobs:
        names.append(blob.name)
    return names


def upload_blob(blobService: BlockBlobService, container_name: str, blob_name: str, blob) -> str:
    """Put Blob from base64 into Azure Blob Storage Container and generate URL"""
    blobService.create_blob_from_bytes(
        container_name=container_name, blob_name=blob_name, blob=blob)
    blob_source_url = blobService.make_blob_url(
        container_name=container_name, blob_name=blob_name)
    return blob_source_url


# Not needed in final
def img_filesystem_to_bytes(img: str) -> bytes:
    """Load image from filesystem and encode to base64"""
    encoded_string: bytes = ""
    f = open(img, 'rb')
    encoded_string = base64.b64encode(f.read())
    f.close()
    return encoded_string


def base64_to_img(img_base64: str) -> bytes:
    """Base64 string to img bytes"""
    return base64.b64decode(img_base64)


def upload_to_blob_storage(account_name: str, account_key: str, blob_name: str, container_name: str, img_base64: str) -> str:
    """Upload image into Azure Blob Storage from base64 string"""
    block_blob_service = BlockBlobService(
        account_name=account_name, account_key=account_key)
    img_file = base64_to_img(img_base64=img_base64)
    url = upload_blob(blobService=block_blob_service,
                      container_name=container_name,
                      blob_name=blob_name, blob=img_file)
    return url


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    account_name: str = 'expensely'
    account_key: str = 'eHbEkWQXRR0P8j+qphsOtDG6AT4khzrosvO2uX79TkfGcz2aveuOUUPzP0sYfeDTfB61MDo/jHetnoRy7QGHHw=='
    container: str = 'test-expensely'

    img_data = ''
    blob_name = ''

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        img_data = req_body.get('img_data')
        blob_name = req_body.get('blob_name')

    if img_data != '' and blob_name != '':
        url = upload_to_blob_storage(account_name=account_name, account_key=account_key,
                                     blob_name=blob_name, container_name=container, img_base64=img_data)
        response_body = {"url": url}
        return func.HttpResponse(status_code=200, body=json.dumps(response_body))
    else:
        return func.HttpResponse(
            "Please pass a base64 encoded img_data and blob_name in the request body",
            status_code=400
        )
