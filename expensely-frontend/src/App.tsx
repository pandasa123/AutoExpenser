import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import ThemeGenerator from './utils/ThemeGenerator';
import { ThemeProvider } from './utils/ThemeContext';
import Dashboard from './pages/Dashboard';
import NewReport from './pages/NewReport';

interface IAppTypes {
  logout: any;
  accountIdentifer: string;
}

const App = ({ logout, accountIdentifer }: IAppTypes) => {
  const [theme, setTheme] = useState(ThemeGenerator);

  const toggleTheme = (currentTheme: string): void => {
    if (currentTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
      <Layout logout={logout}>
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps: any) => (
              <Dashboard {...routeProps} accountIdentifer={accountIdentifer} />
            )}
          />
          <Route
            path="/newreport"
            render={(routeProps: any) => (
              <NewReport {...routeProps} accountIdentifer={accountIdentifer} />
            )}
          />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
