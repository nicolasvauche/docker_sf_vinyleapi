import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import Grid from "./Grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMugHot, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";

const ListArtist = ({pagetitle}) => {
    const [loading, setLoading] = useState(true)
    const [artists, setArtists] = useState([])

    useEffect(() => {
        document.title = 'Les artistes de votre vinylothèque'

        const fetchArtists = async () => {
            const url = 'http://localhost:7070/api/artist'
            setLoading(true);

            try {
                const {data: response} = await axios.get(url);
                setArtists(response);
            } catch (error) {
                console.error(error.message);
            }

            setLoading(false);
        }

        fetchArtists()
    }, [])

    return (
        <>
            {loading && (
                <p className="loading">
                    <FontAwesomeIcon icon={faMugHot} size='6x' spin />
                </p>
            )}

            {!loading && (
                <>
                    {pagetitle ? <h2>{pagetitle}</h2> : <h1>Les artistes</h1>}

                    <div className="pagecontrols">
                        <NavLink to='/artistes/ajouter' className="success">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </NavLink>
                    </div>

                    <Grid items={artists} context="artiste" />
                </>
            )}
        </>)
}

export default ListArtist
