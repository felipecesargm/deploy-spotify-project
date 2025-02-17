import axios from "axios";
import "dotenv/config";

const { NODE_ENV } = process.env;

const URL = NODE_ENV === "development" ? "http://localhost:300/api" : "/api";

const responseArtist = await axios.get(`${URL}/artists`);
const responseSongs = await axios.get(`${URL}/songs`);

export const artistArray = responseArtist.data;
export const songsArray = responseSongs.data;
