import axios from 'axios';

export const archiveTripInTableStorage = async (accountIdentifer: string, tripName: string) => {
  const bodyData = {
    accountId: accountIdentifer,
    trip_name: tripName
  };

  const response = await axios.post(
    'https://expensely.azurewebsites.net/api/ArchiveTripInTableStorage/',
    // 'http://localhost:7071/api/ArchiveTripInTableStorage',
    bodyData
  );
  const data = await response.data;
  return data;
};