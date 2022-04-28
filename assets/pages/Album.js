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

const Album = () => {
    const [loading, setLoading] = useState(true)
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        document.title = 'Les albums de votre vinylothèque'

        const fetchAlbums = async () => {
            const url = 'http://localhost:7070/api/album'
            setLoading(true);

            try {
                const {data: response} = await axios.get(url);
                setAlbums(response);
            } catch (error) {
                console.error(error.message);
            }

            setLoading(false);
        }

        fetchAlbums()
    }, [])

    return (
        <Layout>
            <section>
                {loading && (
                    <p className="loading">
                        <FontAwesomeIcon icon={faMugHot} size='6x' spin />
                    </p>
                )}

                {!loading && (
                    <>
                        <h1>Les albums</h1>

                        <div className="pagecontrols">
                            <p><FontAwesomeIcon icon={faArrowCircleLeft} /></p>
                            <p><FontAwesomeIcon icon={faPlusCircle} /></p>
                            <p><FontAwesomeIcon icon={faEdit} /></p>
                            <p><FontAwesomeIcon icon={faEye} /></p>
                            <p><FontAwesomeIcon icon={faTrash} /></p>
                        </div>

                        <div className="app-grid">
                            {albums.map(item => (
                                <div className="grid-item" key={item.id}>
                                    <h2>{item.title}</h2>
                                    <p>{item.artist.name}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </Layout>
    )
}

export default Album
