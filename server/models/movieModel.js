const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    hero: {
        type: String,
        required: true
    },
    heroine: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    }

}, {timestamps: true})

const movieDb = new mongoose.model("movies", movieSchema)

module.exports = movieDb