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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesController = void 0;
const index_1 = require("../index");
const mongodb_1 = require("mongodb");
class SeriesController {
    static findData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.seriesCollection.find({}).toArray();
                res.status(200).json(result);
            }
            catch (err) {
                res.send(err);
            }
        });
    }
    static postSeries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const series = yield index_1.seriesCollection.insertOne(payload);
                res.status(201).json(series);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
    static updateSeries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = { "_id": new mongodb_1.ObjectID(`${req.params.id}`) };
                const payload = {
                    title: req.body.title,
                    overview: req.body.overview,
                    poster_path: req.body.poster_path,
                    popularity: req.body.popularity,
                    tags: req.body.tags
                };
                const series = yield index_1.seriesCollection.updateOne(query, { $set: payload });
                res.status(200).json(series);
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    }
    static deleteSeries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = { "_id": new mongodb_1.ObjectID(`${req.params.id}`) };
                const series = yield index_1.seriesCollection.deleteOne(query);
                res.status(200).json(series);
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        });
    }
}
exports.SeriesController = SeriesController;
