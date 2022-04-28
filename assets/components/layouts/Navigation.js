import React from 'react'
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faLineChart, faList, faRecordVinyl, faUserAstronaut} from '@fortawesome/free-solid-svg-icons'

import './Navigation.scss'

const Navigation = () => {
    return (
        <nav className="app-navigation">
            <NavLink to='/' activeclassname='active'>
                <FontAwesomeIcon icon={faHome} />
                Accueil
            </NavLink>

            <NavLink to='/albums' activeclassname='active'>
                <FontAwesomeIcon icon={faRecordVinyl} />
                Albums
            </NavLink>

            <NavLink to='/artistes' activeclassname='active'>
                <FontAwesomeIcon icon={faUserAstronaut} />
                Artistes
            </NavLink>

            <NavLink to='/categories' activeclassname='active'>
                <FontAwesomeIcon icon={faList} />
                Catégories
            </NavLink>

            <NavLink to='/' activeclassname='active'>
                <FontAwesomeIcon icon={faLineChart} />
                Stats
            </NavLink>
        </nav>
    )
}

export default Navigation
