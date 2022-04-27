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

const Category = () => {
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        document.title = 'Les catégories' + document.title

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

        fetchCategories()
    }, [])

    return (
        <Layout>
            <section>
                <h1>Les catégories</h1>

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
                        {categories.map(item => (
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

export default Category
