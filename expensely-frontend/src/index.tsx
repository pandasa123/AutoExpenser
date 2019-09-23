import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initializeIcons } from 'office-ui-fabric-react';
import './index.css';
import { AzureAD, IAccountInfo } from 'react-aad-msal';
import { AuthProviderFactory } from './utils/AuthProviderFactory';

initializeIcons();

let accountIdentifier: string = '';

const logoutCallback = (logout: any) => {
  return (
    <BrowserRouter>
      <App logout={logout} accountIdentifer={accountIdentifier} />
    </BrowserRouter>
  );
};

const printAccountInfo = (accountInfo: IAccountInfo) => {
  accountIdentifier = accountInfo.account.accountIdentifier;
    // accountInfo.authenticationResponse.account.accountIdentifier;
};

ReactDOM.render(
  <AzureAD
    provider={AuthProviderFactory}
    forceLogin={true}
    authenticatedFunction={logoutCallback}
    accountInfoCallback={printAccountInfo}
  />,
  document.getElementById('root')
);
