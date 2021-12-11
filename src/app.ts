import "reflect-metadata";
import express from 'express';

require('./setup/initalize')

const cors = require('cors');
const app = express();
const port = 3000;
const runeliteRouter = require('./routes/runelite')


app.use(express.json());
app.use(cors())
app.use('/api', runeliteRouter);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );