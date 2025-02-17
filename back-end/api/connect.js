import { MongoClient } from "mongodb";

const URI =
    "mongodb+srv://User:user123@cluster0.j7hb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const db = client.db("spotifyProject");

const songs = await db.collection("songs").find({}).toArray();

console.log(songs);
