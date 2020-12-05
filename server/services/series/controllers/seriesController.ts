
import { Request, Response } from 'express';
import { seriesCollection } from '../index';
import { ObjectID } from 'mongodb';

interface payloadConfig {
    title: string,
    overview: string,
    poster_path: string,
    popularity: string,
    tags: String[]
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
                popularity: req.body.popularity
            }
            const series = await seriesCollection.findOneAndUpdate(query, { $set: payload }, { returnOriginal: false })
            res.status(200).json(series);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    static async addTag (req: Request, res: Response) {
        console.log(req.body, "<<< BODY TAG")
        try {
            const query = { "_id": new ObjectID(`${req.params.id}`) }
            const updateTags = {
                $push: {"tags": req.body.tag }
            }
            const series = await seriesCollection.findOneAndUpdate(query, updateTags, { returnOriginal: false });
            res.status(200).json(series);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    static async deleteSeries (req: Request, res: Response) {
        try {
            const query = {"_id": new ObjectID(`${req.params.id}`)}
            const series = await seriesCollection.findOneAndDelete(query);
            res.status(200).json(series)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}