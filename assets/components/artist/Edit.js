import React, {useEffect, useState} from 'react'
import {NavLink, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleLeft, faEye, faMugHot, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";

const EditArtist = () => {
    const {slug} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [artist, setArtist] = useState([])
    const [itemName, setItemName] = React.useState('')
    const [itemCover, setItemCover] = React.useState('');
    const componentUrl = 'http://localhost:7070/api/artist/' + slug

    useEffect(() => {
        document.title = 'Les artistes de votre vinylothèque'

        const fetchArtist = async () => {
            setLoading(true)

            try {
                const {data: response} = await axios.get(componentUrl)
                setArtist(response)
                setItemName(response.name)
            } catch (error) {
                console.error(error.message)
            }

            setLoading(false)
        }

        fetchArtist()
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
                    {artist.cover && (
                        <div className="details">
                            <img src={'/build/img/artist/' + artist.cover} alt={artist.name} />
                        </div>
                    )}

                    <div className="pagecontrols">
                        <NavLink to='/artistes'>
                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                        </NavLink>
                        <NavLink to='/artistes/ajouter' className="success">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </NavLink>
                        <NavLink to={'/artistes/details/' + slug} className="info">
                            <FontAwesomeIcon icon={faEye} />
                        </NavLink>
                        <NavLink to={'/artistes/supprimer/' + slug} className="danger">
                            <FontAwesomeIcon icon={faTrash} />
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

                        <button type="submit">Modifier</button>
                    </form>
                </>
            )}
        </>
    )
}

export default EditArtist
