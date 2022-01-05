import "reflect-metadata";
// require('dotenv').config();
import "./setup/initalize"
import { Request, Response } from 'express';

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

app.get('/hello', (req: Request, res: Response) => {
    return res.json({msg: "Success!"})
})

app.get('/health', (req: Request, res: Response) => {
    return res.send("HEALTHY").status(200);
})

app.get('/', (req: Request, res: Response) => {
    return res.send("ping success").status(200);
})

app.listen( port, () => {
    console.log( `\t> OSRSEvents backend started at http://localhost:${ port }` );
} );