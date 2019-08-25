import axios from 'axios';

export const getTripFromTableStorage = async (accountIdentifer: string) => {
  const bodyData = {
    accountId: accountIdentifer
  };

  const response = await axios.post(
    'https://expensely.azurewebsites.net/api/GetTripFromTableStorage/',
    // 'http://localhost:7071/api/GetTripFromTableStorage',
    bodyData
  );
  const data = await response.data;
  return data;
};