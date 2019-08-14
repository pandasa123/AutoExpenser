import http.client
import urllib.request
import urllib.parse
import urllib.error
import base64
import json
import time

source = r"https://expensely.blob.core.windows.net/test-expensely/IMG_0709.JPG"
body = {"url": source}
body = json.dumps(body)
endpoint = r"receiptcv.cognitiveservices.azure.com"

headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'a9b7738d8ee4489eba0c400015a840c2',
}

try:
    conn = http.client.HTTPSConnection(endpoint)
    conn.request(
        "POST", "/formrecognizer/v1.0-preview/prebuilt/receipt/asyncBatchAnalyze", body, headers)
    response = conn.getresponse()
    data = response.read()
    operationURL = "" + response.getheader("Operation-Location")
    print("Operation-Location header: " + operationURL)
    conn.close()
except Exception as e:
    print(e)
    exit()


operationId = operationURL.split("operations/")[1]

conn = http.client.HTTPSConnection(endpoint)
while True:
    try:
        conn.request(
            "GET", f"/formrecognizer/v1.0-preview/prebuilt/receipt/operations/{operationId}", "", headers)
        responseString = conn.getresponse().read().decode('utf-8')
        responseDict = json.loads(responseString)
        conn.close()
        print(responseString)
        if 'status' in responseDict and responseDict['status'] not in ['NotStarted', 'Running']:
            break
        time.sleep(1)
    except Exception as e:
        print(e)
        exit()
