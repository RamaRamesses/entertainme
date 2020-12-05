import express from 'express';
import { MongoClient } from 'mongodb';
import { MoviesController } from './controllers/moviesController'

const databaseURL = "mongodb://localhost:27017";
const client = new MongoClient(databaseURL, { useUnifiedTopology: true });

client.connect();

const db = client.db('entertain-me');
export const moviesCollection = db.collection('movies');


const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', MoviesController.findData)
app.post('/', MoviesController.postMovie)
app.put('/:id', MoviesController.updateMovie)
app.patch('/:id', MoviesController.addTag)
app.delete('/:id', MoviesController.deleteMovie)

app.listen(PORT, () => console.log(PORT));