import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import Loading from "../Loading"
import Grid from "./Grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

const ListArtist = ({pagetitle}) => {
    const [loading, setLoading] = useState(true)
    const [artists, setArtists] = useState([])
    const [q, setQ] = useState("")
    const [searchParam] = useState(["name"])

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

    const search = items => {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        });
    }

    return (
        <>
            {loading && <Loading />}

            {!loading && (
                <>
                    {pagetitle ? <h2>{pagetitle}</h2> : <h1>Les artistes</h1>}

                    <div className="pagecontrols">
                        <NavLink to='/artistes/ajouter' className="success">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </NavLink>
                    </div>

                    <div className="search-wrapper">
                        <label htmlFor="search-input">
                            <input
                                type="search"
                                name="search-input"
                                id="search-input"
                                className="search-input"
                                placeholder="Rechercher…"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <span className="sr-only">Rechercher un artiste</span>
                        </label>
                    </div>

                    <Grid items={search(artists)} context="artiste" />
                </>
            )}
        </>)
}

export default ListArtist
