import { Configuration, AuthenticationParameters, MsalAuthProvider, LoginType } from 'react-aad-msal';

const config: Configuration = {
  auth: {
    authority:
      'https://login.microsoftonline.com/tfp/expensely.onmicrosoft.com/B2C_1_expensely_signup/',
    clientId: 'ac6588f2-aba7-4638-b015-89ac51cd01d0',
    redirectUri: "https://expenselyapp.herokuapp.com"
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
};

const authenticationParameters: AuthenticationParameters = {
  scopes: ['https://expensely.onmicrosoft.com/api/user_impersonation']
};

export const AuthProviderFactory = new MsalAuthProvider(config, authenticationParameters, LoginType.Redirect);