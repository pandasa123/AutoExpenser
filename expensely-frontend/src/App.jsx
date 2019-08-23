import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './Layout'
import ThemeGenerator from './utils/ThemeGenerator'
import { ThemeProvider } from './utils/ThemeContext'
import Dashboard from './pages/Dashboard'
import NewReport from './pages/NewReport'

const App = () => {

    const [theme, setTheme] = useState(ThemeGenerator)

    const toggleTheme = (currentTheme) => {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return (
        <ThemeProvider value={{ theme, toggleTheme }}>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route path='/newreport' component={NewReport} />
                </Switch>
            </Layout>
        </ThemeProvider>
    )
}

export default App
