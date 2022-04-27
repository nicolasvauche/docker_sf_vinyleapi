import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faArrowCircleLeft,
    faEdit,
    faEye,
    faMugHot,
    faPlusCircle,
    faTrash
} from '@fortawesome/free-solid-svg-icons'

import Layout from '../components/layouts/Default'

const Artist = () => {
    const [loading, setLoading] = useState(true)
    const [artists, setArtists] = useState([])

    useEffect(() => {
        document.title = 'Les artistes' + document.title

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
        <Layout>
            <section>
                <h1>Les artistes</h1>

                <div className="pagecontrols">
                    <p><FontAwesomeIcon icon={faArrowCircleLeft} /></p>
                    <p><FontAwesomeIcon icon={faPlusCircle} /></p>
                    <p><FontAwesomeIcon icon={faEdit} /></p>
                    <p><FontAwesomeIcon icon={faEye} /></p>
                    <p><FontAwesomeIcon icon={faTrash} /></p>
                </div>

                {loading && (
                    <p className="loading">
                        <FontAwesomeIcon icon={faMugHot} size='6x' spin />
                    </p>
                )}

                {!loading && (
                    <div className="app-grid">
                        {artists.map(item => (
                            <div className="grid-item" key={item.id}>
                                <h2>{item.name}</h2>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    )
}

export default Artist
