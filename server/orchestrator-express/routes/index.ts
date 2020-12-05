import express from 'express';
import { redis } from '../app';
import axios from 'axios';
export const router = express.Router();

// MOVIEs

router.get('/movies', async (req, res) => {
    try {
        const moviesUrl = `http://localhost:5001/`;
        const movies = await redis.get('movies');
        if(movies) {
            res.status(200).json(JSON.parse(movies))
        } else {
            const response = await axios({
                method: 'GET',
                url: moviesUrl,
            })
            console.log('delete')
            await redis.set('movies', JSON.stringify(response.data));
            res.status(200).json(response.data);
        }
        // console.log(response);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

router.post('/movies', async (req, res) => {
    try {
        const moviesUrl = `http://localhost:5001/`;
        const response = await axios({
            method: 'POST',
            url: moviesUrl,
            data: req.body
        })
        res.status(201).json(response.data);
        redis.del('movies')
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/movies/:id', async (req, res) => {
    try {
        const moviesUrl = `http://localhost:5001/${req.params.id}`;
        const response = await axios ({
            method: 'PUT',
            url: moviesUrl,
            data: req.body
        })
        res.status(200).json(response.data);
        redis.del('movies');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.patch('/movies/:id', async (req, res) => {
    try {
        const moviesUrl = `http://localhost:5001/${req.params.id}`;
        const response = await axios({
            method: 'PATCH',
            url: moviesUrl,
            data: req.body
        })
        res.status(200).json(response.data);
        redis.del('movies');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/movies/:id', async (req, res) => {
    try {
        const moviesUrl = `http://localhost:5001/${req.params.id}`;
        const response = await axios ({
            method: 'DELETE',
            url: moviesUrl
        })
        res.status(200).json(response.data);
        redis.del('movies');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// SERIES

router.get('/series', async (req, res) => {
    try {
        const seriesUrl = `http://localhost:5002/`;
        const series = await redis.get('series');
        if(series) {
            res.status(200).json(JSON.parse(series))
        } else {
            const response = await axios({
                method: 'GET',
                url: seriesUrl,
            })
            await redis.set('series', JSON.stringify(response.data));
            res.status(200).json(response.data);
        }
        // console.log(response);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

router.post('/series', async (req, res) => {
    try {
        const seriesUrl = `http://localhost:5002/`;
        const response = await axios({
            method: 'POST',
            url: seriesUrl,
            data: req.body
        })
        res.status(201).json(response.data);
        redis.del('series')
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/series/:id', async (req, res) => {
    try {
        const seriesUrl = `http://localhost:5002/${req.params.id}`;
        const response = await axios ({
            method: 'PUT',
            url: seriesUrl,
            data: req.body
        })
        res.status(200).json(response.data);
        redis.del('series');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/series/:id', async (req, res) => {
    try {
        const seriesUrl = `http://localhost:5002/${req.params.id}`;
        const response = await axios ({
            method: 'DELETE',
            url: seriesUrl
        })
        res.status(200).json(response.data);
        redis.del('series');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.patch('/series/:id', async (req, res) => {
    try {
        const seriesUrl = `http://localhost:5002/${req.params.id}`;
        const response = await axios({
            method: 'PATCH',
            url: seriesUrl,
            data: req.body
        })
        res.status(200).json(response.data)
        redis.del('series')
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})
// BOTH

router.get('/entertainme', async (req, res) => {
    try {
        const seriesUrl = `http://localhost:5002/`;
        const moviesUrl = `http://localhost:5001/`;

        let seriesRedis: any = await redis.get('series');
        let moviesRedis: any = await redis.get('movies');

        const series = await axios({
            method: 'GET',
            url: seriesUrl,
        })
        await redis.set('series', JSON.stringify(series.data));
        const movies = await axios({
            method: 'GET',
            url: moviesUrl,
        })
        await redis.set('movies', JSON.stringify(movies.data));
        seriesRedis = await redis.get('series');
        moviesRedis = await redis.get('movies');

        const seriesJSON = JSON.parse(seriesRedis)
        const moviesJSON = JSON.parse(moviesRedis)

        res.status(200).json({
            movies: moviesJSON,
            tvSeries: seriesJSON
        })
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})