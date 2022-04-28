import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import Loading from "../Loading"
import Grid from "./Grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleLeft, faEdit, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";

const ShowArtist = () => {
    const {slug} = useParams();
    const [loading, setLoading] = useState(true)
    const [artist, setArtist] = useState([])

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

    return (
        <>
            {loading && <Loading />}

            {!loading && (
                <>
                    {/*<h1>{artist.name}</h1>*/}

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
                        <NavLink to={'/artistes/supprimer/' + slug} className="danger">
                            <FontAwesomeIcon icon={faTrash} />
                        </NavLink>
                    </div>

                    <div className="details">
                        {artist.cover && (
                            <img src={'/build/img/artist/' + artist.cover} alt={artist.name} />
                        )}

                        {!artist.cover && (
                            <img src="/build/img/artist/_placeholder.png" alt={artist.name} />
                        )}

                        {artist.albums.length > 0 && (
                            <Grid items={artist.albums} context="album" />
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default ShowArtist
