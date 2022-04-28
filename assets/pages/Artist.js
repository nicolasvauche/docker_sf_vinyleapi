import React from 'react'

import Layout from '../components/layouts/Default'
import List from "../components/artist/List";
import Add from "../components/artist/Add";
import Edit from "../components/artist/Edit";
import Show from "../components/artist/Show";
import Delete from "../components/artist/Delete";

const Artist = ({action}) => {
    return (
        <Layout>
            <section>
                {action === 'list' && <List />}
                {action === 'add' && <Add />}
                {action === 'edit' && <Edit />}
                {action === 'show' && <Show />}
                {action === 'delete' && <Delete />}
            </section>
        </Layout>
    )
}

export default Artist
