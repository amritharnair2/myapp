const mongoose = require("mongoose");
const movieDb = require("../models/movieModel");
const reviewDb = require("../models/reviewModel");

const updateMovieAvgRating = async (movieId) => {
  let movieObjectId;
  movieObjectId = new mongoose.Types.ObjectId(movieId);
 
  const avgRating = await reviewDb.aggregate([
    { $match: { movie: movieObjectId } },
    {
      $group: {
        _id: "$movie",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  const avgRatingValue = avgRating.length > 0 ? avgRating[0].avgRating : 0;
  const roundedRating = Math.round(avgRatingValue * 2) / 2;

  const updatedMovie = await movieDb.findByIdAndUpdate(
    movieId,
    { rating: roundedRating },
    { new: true }
  );

  return updatedMovie;
};

module.exports = updateMovieAvgRating;
