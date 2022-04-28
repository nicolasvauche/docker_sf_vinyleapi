import React, {useEffect, useState} from 'react'
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleLeft, faEdit, faEye, faMugHot, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const DeleteArtist = () => {
    const {slug} = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [artist, setArtist] = useState([])
    const componentUrl = 'http://localhost:7070/api/artist/' + slug

    useEffect(() => {
        document.title = 'Les artistes de votre vinylothèque'

        const fetchArtist = async () => {
            const url = 'http://localhost:7070/api/artist/' + slug
            setLoading(true);

            try {
                const {data: response} = await axios.get(url);
                setArtist(response);
            } catch (error) {
                console.error(error.message);
            }

            setLoading(false);
        }

        fetchArtist()
    }, [])

    const handleDelete = () => {
        setLoading(true)

        try {
            axios.delete(componentUrl)
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
                    <h1>Supprimer</h1>

                    <div className="pagecontrols">
                        <NavLink to='/artistes'>
                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                        </NavLink>
                        <NavLink to='/artistes/ajouter' className="success">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </NavLink>
                        <NavLink to={'/artistes/modifier/' + slug} className="info">
                            <FontAwesomeIcon icon={faEdit} />
                        </NavLink>
                        <NavLink to={'/artistes/details/' + slug} className="info">
                            <FontAwesomeIcon icon={faEye} />
                        </NavLink>
                    </div>

                    <div className="details">
                        {artist.cover && (
                            <img src={'/build/img/artist/' + artist.cover} alt={artist.name} />
                        )}

                        {!artist.cover && (
                            <img src="/build/img/artist/_placeholder.png" alt={artist.name} />
                        )}

                        <button className="danger" onClick={handleDelete}>Oui, je supprime !</button>
                    </div>
                </>
            )}
        </>
    )
}

export default DeleteArtist
