import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios, {isCancel, AxiosError} from 'axios';
import * as fs from "node:fs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || '8080';

const corsOptions = {
    origin: ["http://localhost:5173"],
};

const requiredEnv = ["TMDB_URL","TMDB_TOKEN","DB_TYPE"]

// for (const env of requiredEnv) {
//     if(process.env[env] === undefined) {
//         throw new Error(`Missing required env: ${env}`);
//     }
// }

app.use(cors(corsOptions));

const data = require("../filmData.json");

app.get("/", (request: Request, response: Response) => {
    response.status(200).send(data[1]);
});

app.get("/api/films" , (request: Request, response: Response) => {
    //response.json({films: ["Matrix","Bob l'éponge","Joker"]})
    response.json(data);
});

app.get("/api/genres", (request: Request, response: Response) => {
    try{
        const genres = require("../genres.json");
        response.json(genres);
        console.log(genres);
    }catch(err) {
        response.status(500).send("Error loggin genres");
        console.error(err);
    }

});

app.get("/api/providers", (request: Request, response: Response) => {
    try{
        if(!fs.existsSync("providers.json")){
            getTMDBProviders();
        }
        const providers = require("../providers.json");
        response.json(providers);
        console.log(providers);
    }catch(err) {
        response.status(500).send("Error loggin providers");
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}).on("error", (err: Error) => {
    throw new Error(err.message);
});

//
// api.data.results.forEach((movie: any) => {
//     console.log(movie.title);
// });

async function getTMDBProviders() {

        try{
            const response = await axios.get(`https://api.themoviedb.org/3/watch/providers/movie?language=fr-FR&watch_region=BE'`, {
                method: 'GET',
                headers: {accept: 'application/json', Authorization: `Bearer ${process.env.TMDB_TOKEN}`},
            });
            console.log(response.data.results);
            fs.writeFileSync('providers.json', JSON.stringify(response.data.results));
        }
        catch(err){
            console.error(err);
        }
}

async function getTMDBGenres() {

    try{
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=fr`, {
            method: 'GET',
            headers: {accept: 'application/json', Authorization: `Bearer ${process.env.TMDB_TOKEN}`},
        });
        console.log(response.data.genres);
        fs.writeFileSync('genres.json', JSON.stringify(response.data.genres));
    }
    catch(err){
        console.error(err);
    }
}

async function getTMDBList() {
    try{
        const response = await axios.get(`${process.env.TMDB_URL}`, {
            method: 'GET',
            headers: {accept: 'application/json', Authorization: `Bearer ${process.env.TMDB_TOKEN}`},
        });
        console.log(response);
    }
    catch(err){
        console.error(err);
    }
}