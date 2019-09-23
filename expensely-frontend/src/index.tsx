import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initializeIcons } from 'office-ui-fabric-react';
import './index.css';
import { AzureAD } from 'react-aad-msal';
import { AuthProviderFactory } from './utils/AuthProviderFactory';

initializeIcons();

ReactDOM.render(
  <AzureAD provider={AuthProviderFactory} forceLogin={true}>
    {({ login, logout, authenticationState, accountInfo }: any) => {
      console.log(accountInfo);
      return (
        <BrowserRouter>
          <App
            logout={logout}
            accountIdentifer={accountInfo.account.accountIdentifer}
          />
        </BrowserRouter>
      );
    }}
  </AzureAD>,
  document.getElementById('root')
);
