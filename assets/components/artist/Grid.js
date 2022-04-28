import React from 'react'
import {NavLink} from "react-router-dom";

const Grid = ({items, context}) => {
    return (
        <>
            <p>{items.length} {context}{items.length > 1 ? 's' : ''} dans la vinylothèque :</p>
            <div className="app-grid">
                {items.map(item => (<div className="grid-item" key={item.id}>
                    <NavLink to={'/' + context + 's/details/' + item.slug}>
                        <>
                            <img src={'/build/img/artist/' + item.cover} alt={context === 'albums' ? item.title : item.name} />
                            {context !== 'artiste' && (
                                <h3>{context === 'album' ? item.title : item.name}</h3>
                            )}
                        </>
                    </NavLink>
                </div>))}
            </div>
        </>
    )
}

export default Grid
