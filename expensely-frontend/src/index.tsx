import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initializeIcons, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import './index.css';
import { AzureAD, AuthenticationState, IAccountInfo } from 'react-aad-msal';
import { AuthProviderFactory } from './utils/AuthProviderFactory';

initializeIcons();

interface IAzureADFunctionProps {
  login: () => void;
  logout?: () => void;
  authenticationState: AuthenticationState;
  accountInfo: IAccountInfo;
}

ReactDOM.render(
  <AzureAD provider={AuthProviderFactory} forceLogin={true}>
    {({
      login,
      logout,
      authenticationState,
      accountInfo
    }: IAzureADFunctionProps) => {
      if (authenticationState === AuthenticationState.Authenticated) {
        return (
          <BrowserRouter>
            <App
              logout={logout}
              accountIdentifer={accountInfo.account.accountIdentifier}
            />
          </BrowserRouter>
        );
      } else {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}
          >
            <Spinner label="Waiting for login..." size={SpinnerSize.large} />
          </div>
        );
      }
    }}
  </AzureAD>,
  document.getElementById('root')
);
