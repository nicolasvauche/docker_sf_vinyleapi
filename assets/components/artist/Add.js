import React, {useEffect, useState} from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleLeft, faMugHot} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AddArtist = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [itemName, setItemName] = React.useState('')
    const [itemCover, setItemCover] = React.useState('')
    const componentUrl = 'http://localhost:7070/api/artist'

    useEffect(() => {
        document.title = 'Ajouter un artiste à votre vinylothèque'
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)

        try {
            axios.post(componentUrl,
                {
                    'name': itemName,
                    'cover': itemCover
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(response => {
                    navigate('/artistes')
                })
        } catch (error) {
            console.error(error.message);
        }

        setLoading(false)
    }

    return (
        <>
            {loading && (
                <p className="loading">
                    <FontAwesomeIcon icon={faMugHot} size='6x' spin />
                </p>
            )}
            {!loading && (
                <>
                    <h1>Nouvel artiste</h1>

                    <div className="pagecontrols">
                        <NavLink to='/artistes'>
                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                        </NavLink>
                    </div>

                    <form className='app-form' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nom de l'artiste</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cover">Image de l'artiste</label>
                            <input
                                type="file"
                                id="cover"
                                className="form-control"
                                onChange={(e) => setItemCover(e.target.files[0])} />
                        </div>

                        <button type="submit">Ajouter</button>
                    </form>
                </>
            )}
        </>
    )
}

export default AddArtist
