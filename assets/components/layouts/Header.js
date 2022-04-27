import React from 'react';
import {NavLink} from 'react-router-dom'

import './Header.scss'

const Header = () => {
    return (
        <header className="app-header">
            <NavLink to='/' activeclassname='active' className="app-brandname">
                vinyl
                <img src="/build/img/logo-vinylotheque.png" className="app-logo" />
                thèque
            </NavLink>
        </header>
    )
}

export default Header;
