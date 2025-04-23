const { addMovie, listMovies, movieDetails, updateMovie, deleteMovie, searchMovie } = require('../../controllers/movieController')

const movieRouter = require('express').Router()
const upload = require('../../middlewares/multer')

movieRouter.post("/create", upload.single("image"), addMovie) //add a movie
movieRouter.get("/listmovies", listMovies) //list all movies
movieRouter.get("/moviedetails/:movieId", movieDetails) //List details of a specific movie
movieRouter.patch("/updatemovie/:movieId", upload.single("image"), updateMovie) //update a movie details
movieRouter.delete("/deletemovie/:movieId", deleteMovie) //delete a movie
movieRouter.get("/searchmovie", searchMovie) //search movie

module.exports = movieRouter