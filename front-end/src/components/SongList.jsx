import React from "react";
import SongItem from "./SongItem";
import { useState } from "react";

const SongList = ({ songsArray }) => {
    const [items, setItems] = useState(5); //variável de estado que guarda a quantidade de itens a serem exibidos, no react é necessário usar o useState para criar variáveis de estado, que sao variáveis que podem ser alteradas e que fazem o componente ser renderizado novamente.
    return (
        <div className="song-list">
            {songsArray
                .filter((currentValue, index) => index < items)
                .map((currentSongObj, index) => (
                    <SongItem {...currentSongObj} index={index} key={index} />
                ))}
            <p
                className="song-list__see-more"
                onClick={() => {
                    setItems(items + 5);
                }}
            >
                Ver mais
            </p>
        </div>
    );
};

export default SongList;
