import { Double } from 'mongodb';
import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    poster_path: {
        type: stringify,
        required: true
    },
    popularity: {
        type: Number,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
})

export const Movies = mongoose.model('Movies', movieSchema);