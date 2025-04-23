const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const movieDb = require("../models/movieModel");
const updateMovieAvgRating = require("../utilities/updateMovieAvgRating");
const reviewDb = require("../models/reviewModel");

//Add a new Review
const addReview = async (req, res) => {
  try {
    const { user, movie, rating, review } = req.body;
    if (!user || !movie || !rating || !review) {
      return res.status(400).json({error: "All fields are required"})
    }
    const newReview = new Review({ user, movie, rating, review });
    await newReview.save();
   
    const updatedMovie = await updateMovieAvgRating(movie);
    res.status(201).json({message: "Review added successfully", review: newReview,  avgRating: updatedMovie.rating, updatedMovie});
  } catch (error) {
      return res.status(error.status || 500).json({error: error.message || "Internal server error"})
  }
}
  
//Get Reviews of a specific movie
const getMovieReviews = async (req, res) => {
    try {
        const { movieId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ error: "Invalid movie ID" });
        }
        const reviews = await Review.find({ movie: movieId })
            .populate("user", "name email") 
            .sort({ createdAt: -1 }); 
            return res.status(200).json(reviews);
    } catch (error) {
        return res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
};

//Get Reviews by a Specific User
const getUserReviews = async (req, res) => {
    try {
      const userId = req.params.userId; 
      if (!userId) {
        return res.status(400).json({message: "User ID is required in URL params.",
        });
      }
      const userReviews = await Review.find({ user: userId }).populate('movie', 'name'); 
  
      if (!userReviews || userReviews.length === 0) {
        return res.status(404).json({message: "No reviews found for this user."});
      }
  
      return res.status(200).json({reviews: userReviews});
  
    } catch (error) {
      return res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
  };

//Update a review
const updateReview = async (req, res) => {
    try {
      const reviewId = req.params.id; 
      if (!reviewId) {
        return res.status(400).json({error: "Review ID is required in URL params."});
      }
      const { rating, review } = req.body;
      const updatedReview = await Review.findByIdAndUpdate(reviewId,
        { rating, review },
        { new: true, runValidators: true }
      ).populate('movie'); ;
  
      if (!updatedReview) {
        return res.status(404).json({error: "Review not found."});
      }
      
      const updatedMovie = await updateMovieAvgRating(updatedReview.movie);

      return res.status(200).json({message: "Review updated successfully",review: updatedReview, avgRating: updatedMovie.rating, updatedMovie});
  
    } catch (error) {
      return  res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
  };

//Delete a review
const deleteReview = async (req, res) => {
    try {
      const reviewId = req.params.id; 
      if (!reviewId) {
        return res.status(400).json({error: "Review ID is required in URL params."});
      }
      const deletedReview = await Review.findByIdAndDelete(reviewId);
  
      if (!deletedReview) {
        return res.status(404).json({error: "Review not found."});
      }

      const updatedMovie = await updateMovieAvgRating(deletedReview.movie);
  
      return res.status(200).json({message: "Review deleted successfully.", avgRating: updatedMovie.rating, updatedMovie});
  
    } catch (error) {
      return res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
  };

  //list reviews
  const listReviews = async (req,res) => {
    try {
        const reviewsList = await reviewDb.find()
        .populate('user', 'name')       // Populate only the 'name' field of the user
  .populate('movie', 'name');     // Populate only the 'name' field of the movie
        return res.status(200).json(reviewsList)
        
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}
  

module.exports = {
    addReview,
    getMovieReviews,
    getUserReviews,
    updateReview,
    deleteReview,
    listReviews
};
