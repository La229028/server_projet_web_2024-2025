import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import "reflect-metadata";
import filmRoutes from './routes/FilmRoute';
import genreRoutes from './routes/GenreRoute';
import providerRoutes from './routes/ProviderRoute';
import { AppDataSource } from "./AppDataSource";
import { UserEntity } from "./entities/UserEntity";
import { GenreEntity } from "./entities/GenreEntity";

dotenv.config();
const app = express();
const PORT = process.env.PORT || '8080';

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/films', filmRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/providers', providerRoutes);

AppDataSource.initialize()
    .then(async () => {
        await seedData();

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        }).on("error", (err: Error) => {
            console.error(err);
        });
    })
    .catch((err: Error) => {
        console.error(err);
    });

const seedData = async () => {
    const userRepository = AppDataSource.getRepository(UserEntity);
    //const genreRepository = AppDataSource.getRepository(GenreEntity);
    //
    // //fetch genres from tmdb api and seed them into the database
    // try {
    //     const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=fr");
    //     const data = await response.json();
    //     const genres = data.genres;
    //     console.log("Seeding genres...");
    //     for (const genreData of genres) {
    //         const genre = genreRepository.create(genreData);
    //         await genreRepository.save(genre);
    //         console.log(`Genre seeded: ${genres.name}`);
    //     }
    // } catch (error) {
    //     console.error("Error during seeding:", error);
    // }


        const users = [
            {
                id: 1,
                firstName: "admin",
                lastName: "admin",
                email: "admin@cool.com",
                password: "admin"
            },
            {
                id: 2,
                firstName: "user",
                lastName: "user",
                email: "user@cool.com",
                password: "user"
            }
        ];

        console.log("Seeding users...");
        for (const userData of users) {
            const user = userRepository.create(userData);
            await userRepository.save(user);
            console.log(`User seeded: ${user.email}`);
        }

        console.log("Data seeding complete.");
}

