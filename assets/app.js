import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home"
import Album from "./pages/Album"
import Artist from "./pages/Artist"
import Category from "./pages/Category"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/albums' element={<Album />} />
                <Route path='/artistes' element={<Artist action='list' />} />
                <Route path='/artistes/ajouter' element={<Artist action='add' />} />
                <Route path='/artistes/modifier/:slug' element={<Artist action='edit' />} />
                <Route path='/artistes/details/:slug' element={<Artist action='show' />} />
                <Route path='/artistes/supprimer/:slug' element={<Artist action='delete' />} />
                <Route path='/categories' element={<Category />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(<App />);
}
