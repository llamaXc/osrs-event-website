import "reflect-metadata";
import "./setup/initalize"

import { osrsAuthValidator } from "./middleware";
import { osrsApiRoutes } from "./routes"

import express, { Request, Response } from 'express';
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use('/api', osrsAuthValidator, (req: Request, res: Response) => {
    res.send("Succes")
});

app.use('/api-unauth', osrsApiRoutes)


app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );