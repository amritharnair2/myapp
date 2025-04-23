const express = require("express");
const { addReview , getMovieReviews, updateReview, deleteReview, getUserReviews, listReviews} = require("../../controllers/reviewController");
const AuthMiddleware = require("../../middlewares/AuthMiddleware");

const reviewRouter = express.Router();

reviewRouter.post("/addreview", AuthMiddleware, addReview); // Add Review
reviewRouter.get("/getreview/:movieId", getMovieReviews); // Get Reviews by Movie
reviewRouter.get("/userreview/:userId",  getUserReviews); // Get Reviews by User
reviewRouter.put('/updatereview/:id', updateReview); // Update Review
reviewRouter.delete("/deletereview/:id", deleteReview); // Delete Review
reviewRouter.get("/listreviews", listReviews) //list all reviews

module.exports = reviewRouter
