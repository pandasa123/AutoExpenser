import { createContext } from 'react'

const ThemeContext = createContext('light')

export const ThemeProvider = ThemeContext.Provider

export default ThemeContext