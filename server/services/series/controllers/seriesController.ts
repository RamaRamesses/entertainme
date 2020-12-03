
import { Request, Response } from 'express';
import { seriesCollection } from '../index';
import { ObjectID } from 'mongodb';

interface payloadConfig {
    title: string,
    overview: string,
    poster_path: string,
    popularity: string,
    tags: Array<any>
}

interface postInterface<T> extends Request {
    body: T
} 


export class SeriesController {
    static async findData (req: Request, res: Response) {
        try {
            const result = await seriesCollection.find({}).toArray();
            res.status(200).json(result)
        } catch (err) {
            res.send(err);
        }
    }

    static async postSeries (req: postInterface<payloadConfig> , res: Response) {
        try {
            const payload = req.body
            const series = await seriesCollection.insertOne(payload)
            res.status(201).json(series);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async updateSeries (req: Request, res: Response) {
        try {
            const query = { "_id": new ObjectID(`${req.params.id}`) }
            const payload = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }
            const series = await seriesCollection.updateOne(query, { $set: payload })
            res.status(200).json(series);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    static async deleteSeries (req: Request, res: Response) {
        try {
            const query = {"_id": new ObjectID(`${req.params.id}`)}
            const series = await seriesCollection.deleteOne(query);
            res.status(200).json(series)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}