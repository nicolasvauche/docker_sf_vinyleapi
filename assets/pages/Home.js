import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMugHot} from '@fortawesome/free-solid-svg-icons'

import Layout from '../components/layouts/Default'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [artists, setArtists] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        document.title = 'Bienvenue dans votre vinylothèque'

        const fetchCategories = async () => {
            const url = 'http://localhost:7070/api/category'
            setLoading(true);

            try {
                const {data: response} = await axios.get(url);
                setCategories(response);
            } catch (error) {
                console.error(error.message);
            }

            setLoading(false);
        }

        const fetchArtists = async () => {
            const url = 'http://localhost:7070/api/artist'
            setLoading(true)

            try {
                const {data: response} = await axios.get(url)
                setArtists(response)
            } catch (error) {
                console.error(error.message)
            }

            setLoading(false)
        }

        fetchCategories()
        fetchArtists()
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
                        <h1>Hello !</h1>

                        <div className="app-grid">
                            {artists.map(item => (
                                <div className="grid-item" key={item.id}>
                                    <h2>{item.name}</h2>
                                </div>
                            ))}
                        </div>

                        <hr />

                        <div className="app-grid">
                            {categories.map(item => (
                                <div className="grid-item" key={item.id}>
                                    <h2>{item.name}</h2>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </Layout>
    )
}

export default Home
