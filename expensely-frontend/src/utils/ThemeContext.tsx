import { createContext } from 'react';

export const ThemeContext: React.Context<any> = createContext('light');

export const ThemeProvider: React.ProviderExoticComponent<
  React.ProviderProps<any>
> = ThemeContext.Provider;

export interface IThemeContext {
  theme: string;
  toggleTheme: Function;
}
