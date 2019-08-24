import React from 'react';
import ReactDOM from 'react-dom';
import authentication from './utils/adb2c';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initializeIcons } from 'office-ui-fabric-react';
import './index.css';

initializeIcons();

authentication.initialize({
  instance: 'https://login.microsoftonline.com/tfp/',
  tenant: 'expensely.onmicrosoft.com',
  signInPolicy: 'B2C_1_expensely_signup',
  applicationId: 'ac6588f2-aba7-4638-b015-89ac51cd01d0',
  cacheLocation: 'sessionStorage',
  scopes: ['https://expensely.onmicrosoft.com/api/user_impersonation'],
  redirectUri: 'http://localhost:3000',
  postLogoutRedirectUri: window.location.origin
});

authentication.run(() => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
  console.log(authentication.getUser());
});

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );
