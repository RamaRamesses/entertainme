import express from 'express';
import { MongoClient } from 'mongodb';

const databaseURL = "mongodb://localhost:27017";
const client = new MongoClient(databaseURL, { useUnifiedTopology: true });

client.connect();

const db = client.db('entertain-me');

const app = express();
const PORT = 3001;


app.listen(PORT, () => console.log(PORT));