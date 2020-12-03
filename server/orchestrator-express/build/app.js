"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const databaseURL = "mongodb://localhost:27017";
const client = new mongodb_1.MongoClient(databaseURL, { useUnifiedTopology: true });
client.connect();
const db = client.db('entertain-me');
const movies = db.collection('movies');
const app = express_1.default();
const PORT = 3001;
app.listen(PORT, () => console.log(PORT));
