import express from 'express';
import { MongoClient } from 'mongodb';
import { SeriesController } from './controllers/seriesController'

const databaseURL = "mongodb://localhost:27017";
const client = new MongoClient(databaseURL, { useUnifiedTopology: true });

client.connect();

const db = client.db('entertain-me');
export const seriesCollection = db.collection('series');


const app = express();
const PORT = 5002;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', SeriesController.findData)
app.post('/', SeriesController.postSeries)
app.put('/:id', SeriesController.updateSeries)
app.delete('/:id', SeriesController.deleteSeries)

app.listen(PORT, () => console.log(PORT));