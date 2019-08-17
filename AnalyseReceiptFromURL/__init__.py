import logging
import azure.functions as func
from AnalyseReceiptFromURL.ReceiptAnalyser import analysis_engine
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # fileURL = r'https://expensely.blob.core.windows.net/test-expensely/IMG_0709.JPG'

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

    if fileURL:
        return func.HttpResponse(json.dumps(report))
    else:
        return func.HttpResponse(
            "Please pass a fileURL in the request body",
            status_code=400
        )
