import React from 'react'
import ReactDOM from 'react-dom'
import b2cauth from 'react-azure-adb2c'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'

b2cauth.initialize({
    instance: 'https://login.microsoftonline.com/tfp/',
    tenant: 'expensely.onmicrosoft.com',
    signInPolicy: 'B2C_1_expensely_signup',
    applicationId: 'ac6588f2-aba7-4638-b015-89ac51cd01d0',
    cacheLocation: 'sessionStorage',
    scopes: ['https://expensely.onmicrosoft.com/api/user_impersonation'],
    redirectUri: 'http://localhost:3000',
    postLogoutRedirectUri: window.location.origin
})

b2cauth.run(() => {
    ReactDOM.render(
        (<BrowserRouter>
            <App />
        </BrowserRouter>),
        document.getElementById('root'))
    serviceWorker.unregister()
})
