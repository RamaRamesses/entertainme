
import { Request, Response } from 'express';
import { moviesCollection } from '../index';
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


export class MoviesController {
    static async findData (req: Request, res: Response) {
        try {
            const result = await moviesCollection.find({}).toArray();
            res.status(200).json(result)
        } catch (err) {
            res.send(err);
        }
    }

    static async postMovie (req: postInterface<payloadConfig> , res: Response) {
        try {
            const payload = req.body
            const movie = await moviesCollection.insertOne(payload)
            res.status(201).json(movie);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async updateMovie (req: Request, res: Response) {
        try {
            const query = { "_id": new ObjectID(`${req.params.id}`) }
            const payload = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }
            const movie = await moviesCollection.updateOne(query, { $set: payload })
            res.status(200).json(movie);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    static async deleteMovie (req: Request, res: Response) {
        try {
            const query = {"_id": new ObjectID(`${req.params.id}`)}
            const movie = await moviesCollection.deleteOne(query);
            res.status(200).json(movie)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}