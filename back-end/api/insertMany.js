import { artistArray } from "../../front-end/src/assets/database/artists.js";
import { songsArray } from "../../front-end/src/assets/database/songs.js";
import { db } from "./connect.js";

const newArtistArray = artistArray.map((currentArtistObj) => {
    const newArtistArray = { ...currentArtistObj };
    delete newArtistArray.id;

    return newArtistArray;
});

const newSongArray = songsArray.map((currentSongObj) => {
    const newSongArray = { ...currentSongObj };
    delete newSongArray.id;

    return newSongArray;
});

const responseSongs = await db.collection("songs").insertMany(newSongArray);
const responseArtist = await db
    .collection("artists")
    .insertMany(newArtistArray);

console.log(responseSongs);
console.log(responseArtist);
