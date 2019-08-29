import logging
from azure.cosmosdb.table.tableservice import TableService
import azure.functions as func


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


def main(documents: func.DocumentList, doc: func.Out[func.Document]) -> str:
    if documents:
        for document in documents:
            if document['status'] == 'Not Reviewed':
                logging.info('Document id: %s', document.id)
                company_name: str = document['company_name']
                items: [] = eval(document['items'])
                total: float = float(document['total'])
                company_policy: dict = get_policy_details(
                    company_name=company_name)
                if len(company_policy) != 0:
                    reviewed: dict = review_items(
                        items=items, total=total, policy=company_policy)
                    print(reviewed)

                    del document['etag']
                    del document['Timestamp']
                    document['status'] == 'Reviewed'
                    document['approved'] = reviewed['approved_total']
                    document['num_approved'] = reviewed['num_approved']
                    logging.info(reviewed)
                    doc.set(document)


if __name__ == "__main__":
    company_name = 'Microsoft'
    company_policy: dict = get_policy_details(company_name=company_name)

    items = [{'1 CONGRESS BURGER': 16.0}, {
        '1 CAPTAIN MORGAN SPICED': 10.49}, {'1 $ DOUBLE': 5.0}]
    total = 34.09
    if len(company_policy) != 0:
        reviewed: dict = review_items(
            items=items, total=total, policy=company_policy)
        print(reviewed)
