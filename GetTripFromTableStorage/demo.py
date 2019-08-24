from azure.cosmosdb.table.tableservice import TableService
import json

if __name__ == "__main__":
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

    query_string: str = "PartitionKey eq '{username}' and trip_name eq '{trip}'".format(
        username="pandasa123", trip="austin_extreme_blue")
    results: [dict] = table_service.query_entities(
        table_name='prod', filter=query_string)

    for result in results:
        for (key, value) in result.items():
            print(key, value, ' ')
