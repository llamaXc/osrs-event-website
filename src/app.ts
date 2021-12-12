import "reflect-metadata";
import "./setup/initalize"
import express from 'express';
import cors from "cors"

// Route setup
import runeliteRouter from "./routes/runelite"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use('/api', runeliteRouter);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );