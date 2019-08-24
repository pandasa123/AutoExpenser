import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initializeIcons } from 'office-ui-fabric-react';
import './index.css';
import { AzureAD } from 'react-aad-msal';
import { AuthProviderFactory } from './utils/AuthProviderFactory';

initializeIcons();

// ReactDOM.render(
//   <AzureAD provider={AuthProviderFactory} forceLogin={true}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </AzureAD>,
//   document.getElementById('root')
// );

const logoutCallback = (logout: any) => {
  return (
    <BrowserRouter>
      <App logout={logout} />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <AzureAD
    provider={AuthProviderFactory}
    forceLogin={true}
    authenticatedFunction={logoutCallback}
  />,
  document.getElementById('root')
);
