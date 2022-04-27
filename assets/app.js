import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home"
import Category from "./pages/Category"
import Artist from "./pages/Artist";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/categories' element={<Category />} />
                <Route path='/artistes' element={<Artist />} />
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
