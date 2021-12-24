import "reflect-metadata";
import "./setup/initalize"

import { osrsAuthValidator } from "./middleware";
import { osrsApiRoutes } from "./routes"

import morgan, { StreamOptions } from "morgan";

import express from 'express';
import cors from "cors"
const morganMiddleware = morgan('tiny')

const app = express();
const port = process.env.PORT || 3000;

app.use(morganMiddleware)
app.use(express.json());
app.use(cors())

app.use('/api', osrsAuthValidator, osrsApiRoutes);
app.use('/api-unauth', osrsApiRoutes);

app.listen( port, () => {
    console.log( `\t> OSRSEvents backend started at http://localhost:${ port }` );
} );