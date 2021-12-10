require('./setup/initalize')
var cors = require('cors');

import express, { json } from 'express';
const app = express();
const runeliteRouter = require('./routes/runelite')
const port = 3000;

app.use(express.json());
app.use(cors())

app.use('/api', runeliteRouter);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );