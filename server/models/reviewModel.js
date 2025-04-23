const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movies',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: true
  }
}, { timestamps: true });

const reviewDb = mongoose.model('reviews', reviewSchema);

module.exports = reviewDb;
