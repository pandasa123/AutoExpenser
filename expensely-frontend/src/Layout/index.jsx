import React, { useContext } from 'react'
import Header from './Header'
import Footer from './Footer'
import ThemeContext from '../utils/ThemeContext'

const Layout = ({ children }) => {
    const themeObject = useContext(ThemeContext)

    let bg = '#faf9f8'

    if (themeObject['theme'] === 'dark') {
        bg = '#292827'
    }

    return (
        <>
            <Header />
            <main style={{ minHeight: '90vh', backgroundColor: bg }}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout