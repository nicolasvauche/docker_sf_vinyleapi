import React from 'react';

import Header from './Header'
import Navigation from './Navigation'

import './Default.scss'

const Layout = ({children}) => {
    return (
        <>
            <Header />

            <Navigation />

            <main className="app-main">
                {children}
            </main>
        </>
    )
}

export default Layout;
