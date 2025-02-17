import express from "express";
import cors from "cors";
import { db } from "./connect.js";

const app = express();

const PORT = 3001;

app.use(cors()); // Essa linha é necessária para que o front-end consiga acessar o back-end, pois ela libera o acesso externo à API.

app.get("/", (request, response) => {
    response.send("Hello!");
});
app.get("/artists", async (request, response) => {
    response.send(await db.collection("artists").find({}).toArray());
});
app.get("/songs", async (request, response) => {
    response.send(await db.collection("songs").find({}).toArray());
});

app.listen(PORT, () => {
    console.log("Server is running on port 3001");
});
