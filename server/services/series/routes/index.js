import express from 'express';
import SeriesController from '../controllers/seriesController';
const router = express.Router();

router.get('/', SeriesController.findData);

export default router