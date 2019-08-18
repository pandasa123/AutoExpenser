import os
import base64
from azure.storage.blob import BlockBlobService, PublicAccess
from azure.storage.common.models import ListGenerator as ListGeneratorType
import tempfile


def list_all_blobs(blobService: BlockBlobService) -> []:
    """Generate list of blob names in Azure Blob Storage Container"""
    names = []
    blobs: ListGeneratorType = blobService.list_blobs(container)
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


def base64_to_img(img_base64: bytes) -> bytes:
    """Base64 to img bytes"""
    return base64.decodebytes(img_base64)


def main(account_name: str, account_key: str, container_name: str, img_base64: bytes) -> str:
    """Upload image into Azure Blob Storage from base64"""
    block_blob_service = BlockBlobService(
        account_name=account_name, account_key=account_key)
    img_file = base64_to_img(img_base64=img_base64)
    url = upload_blob(blobService=block_blob_service,
                      container_name=container,
                      blob_name=filename, blob=img_file)
    return url


if __name__ == "__main__":

    account_name: str = 'expensely'
    account_key: str = 'eHbEkWQXRR0P8j+qphsOtDG6AT4khzrosvO2uX79TkfGcz2aveuOUUPzP0sYfeDTfB61MDo/jHetnoRy7QGHHw=='
    container: str = 'test-expensely'

    filename = 'IMG_0704.jpg'

    # Won't be needed in final
    img_base64 = img_filesystem_to_bytes(img='Test/'+filename)

    url = main(account_name=account_name, account_key=account_key,
               container_name=container, img_base64=img_base64)
    print(url)
