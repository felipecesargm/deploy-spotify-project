import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";

const Song = () => {
    const songId = useParams().id;
    // console.log(songId);

    const { image, name, duration, artist, audio, _id } = songsArray.filter(
        (currentSongObj) => currentSongObj._id === songId
    )[0];

    const artistObj = artistArray.filter(
        (currentArtistObj) => currentArtistObj.name === artist
    )[0];

    const songsArrayFromArtist = songsArray.filter(
        (currentSongObj) => currentSongObj.artist === artistObj.name
    );

    // console.log(songsArrayFromArtist);

    return (
        <div className="song">
            <div className="song__container">
                <div className="song__image-container">
                    <img src={image} alt={`Imagem da música ${name}`} />
                </div>
            </div>

            <div className="song__bar">
                <Link to={`/artist/${artistObj._id}`}>
                    <div className="song__artist-image">
                        <img
                            width={75}
                            height={75}
                            src={artistObj.image}
                            alt={`Imagem do artista ${artist}`}
                        />
                    </div>
                </Link>

                <Player
                    duration={duration}
                    songsArrayFromArtist={songsArrayFromArtist}
                    audio={audio}
                />

                <div>
                    <p className="song__name">{name}</p>
                    <p>{artist}</p>
                </div>
            </div>
        </div>
    );
};

export default Song;
