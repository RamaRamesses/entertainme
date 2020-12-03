"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesCollection = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
// import { MoviesController } from './controllers/moviesController'
const databaseURL = "mongodb://localhost:27017";
const client = new mongodb_1.MongoClient(databaseURL, { useUnifiedTopology: true });
client.connect();
const db = client.db('entertain-me');
exports.moviesCollection = db.collection('series');
const app = express_1.default();
const PORT = 5002;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.get('/', MoviesController.findData)
// app.post('/', MoviesController.postMovie)
// app.put('/:id', MoviesController.updateMovie)
// app.delete('/:id', MoviesController.deleteMovie)
app.listen(PORT, () => console.log(PORT));
