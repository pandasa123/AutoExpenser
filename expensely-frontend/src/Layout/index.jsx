import React from 'react'
import Header from './Header';
import Footer from './Footer';

const Layout = ({ layoutStyle, children }) => {
    return (
        <div style={layoutStyle}>
            <Header />
            <section style={{ minHeight: '90vh' }}>
                {children}
            </section>
            <Footer />
        </div>
    )
}

export default Layout