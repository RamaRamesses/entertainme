import express from 'express';
import MoviesController from '../controllers/moviesController';
const router = express.Router();

router.get('/', MoviesController.findData);

export default router