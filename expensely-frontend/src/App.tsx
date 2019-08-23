import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import ThemeGenerator from './utils/ThemeGenerator';
import { ThemeProvider } from './utils/ThemeContext';
import Dashboard from './pages/Dashboard';
import NewReport from './pages/NewReport';
// import b2cauth from 'react-azure-adb2c';

// Wrap in Route component
// b2cauth.required()

const App = () => {
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
      <Layout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/newreport" component={NewReport} />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
