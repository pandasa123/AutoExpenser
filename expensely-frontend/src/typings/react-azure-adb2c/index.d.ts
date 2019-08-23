// Type definitions for react-azure-adb2c
// Project: react-azure-adb2c

declare module 'react-azure-adb2c' {
  export as namespace react_azure_adb2c
  export = react_azure_adb2c;

  interface AuthConfig {
    instance?: string;
    tenant: string;
    signInPolicy: string;
    resetPolicy?: string;
    applicationId: string;
    cacheLocation?: string;
    redirectUri?: string;
    postLogoutRedirectUri?: string;
    scopes: string[];
  }
  export function initialize(config: AuthConfig): void;
  export function run(launchApp: any): void;
  export function required(WrappedComponent: any, renderLoading?: any): (props: any) => any;
  export function signOut(): any;
  export function getAccessToken(): any;
}