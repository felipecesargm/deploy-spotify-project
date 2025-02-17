import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Artist from "./pages/Artist";
import Songs from "./pages/Songs";
import Song from "./pages/Song";

const App = () => {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/artist/:id" element={<Artist />} />
                {/* :id é um parâmetro dinâmico que será passado para a página Artist. Poderia ser qualquer coisa, como :artistId, :artist, :artistName, etc. O importante é que o parâmetro seja único. Pois sera acessado posteriormente na página Artist. */}
                <Route path="/songs" element={<Songs />} />
                <Route path="/song/:id" element={<Song />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
