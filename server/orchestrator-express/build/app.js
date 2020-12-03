"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const axios_1 = __importDefault(require("axios"));
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
const databaseURL = "mongodb://localhost:27017";
const client = new mongodb_1.MongoClient(databaseURL, { useUnifiedTopology: true });
client.connect();
const db = client.db('entertain-me');
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = 5000;
// MOVIES
app.get('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviesUrl = `http://localhost:5001/`;
        const movies = yield redis.get('movies');
        if (movies) {
            res.status(200).json(JSON.parse(movies));
        }
        else {
            const response = yield axios_1.default({
                method: 'GET',
                url: moviesUrl,
            });
            console.log('delete');
            yield redis.set('movies', JSON.stringify(response.data));
            res.status(200).json(response.data);
        }
        // console.log(response);
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}));
app.post('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviesUrl = `http://localhost:5001/`;
        const response = yield axios_1.default({
            method: 'POST',
            url: moviesUrl,
            data: req.body
        });
        res.status(201).json(response.data);
        redis.del('movies');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
app.put('/movies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviesUrl = `http://localhost:5001/${req.params.id}`;
        const response = yield axios_1.default({
            method: 'PUT',
            url: moviesUrl,
            data: req.body
        });
        res.status(200).json(response.data);
        redis.del('movies');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
app.delete('/movies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moviesUrl = `http://localhost:5001/${req.params.id}`;
        const response = yield axios_1.default({
            method: 'DELETE',
            url: moviesUrl
        });
        res.status(200).json(response.data);
        redis.del('movies');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
// SERIES
app.get('/series', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seriesUrl = `http://localhost:5002/`;
        const series = yield redis.get('series');
        if (series) {
            res.status(200).json(JSON.parse(series));
        }
        else {
            const response = yield axios_1.default({
                method: 'GET',
                url: seriesUrl,
            });
            yield redis.set('series', JSON.stringify(response.data));
            res.status(200).json(response.data);
        }
        // console.log(response);
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}));
app.post('/series', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seriesUrl = `http://localhost:5002/`;
        const response = yield axios_1.default({
            method: 'POST',
            url: seriesUrl,
            data: req.body
        });
        res.status(201).json(response.data);
        redis.del('series');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
app.put('/series/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seriesUrl = `http://localhost:5002/${req.params.id}`;
        const response = yield axios_1.default({
            method: 'PUT',
            url: seriesUrl,
            data: req.body
        });
        res.status(200).json(response.data);
        redis.del('series');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
app.delete('/series/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seriesUrl = `http://localhost:5002/${req.params.id}`;
        const response = yield axios_1.default({
            method: 'DELETE',
            url: seriesUrl
        });
        res.status(200).json(response.data);
        redis.del('series');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
// BOTH
app.get('/entertainme', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seriesUrl = `http://localhost:5002/`;
        const moviesUrl = `http://localhost:5001/`;
        let seriesRedis = yield redis.get('series');
        let moviesRedis = yield redis.get('movies');
        const series = yield axios_1.default({
            method: 'GET',
            url: seriesUrl,
        });
        yield redis.set('series', JSON.stringify(series.data));
        const movies = yield axios_1.default({
            method: 'GET',
            url: moviesUrl,
        });
        yield redis.set('movies', JSON.stringify(movies.data));
        seriesRedis = yield redis.get('series');
        moviesRedis = yield redis.get('movies');
        const seriesJSON = JSON.parse(seriesRedis);
        const moviesJSON = JSON.parse(moviesRedis);
        res.status(200).json({
            movies: moviesJSON,
            tvSeries: seriesJSON
        });
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}));
app.listen(PORT, () => console.log(PORT));
