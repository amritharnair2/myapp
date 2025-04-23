const movieDb = require("../models/movieModel");
const uploadToCloudinary = require("../utilities/imageUpload");

//Add a new movie
const addMovie = async (req,res) => {
    try {
        const {name, language, releaseDate, genre, director, hero, heroine, plot  } = req.body;
        if(!name || !language || !releaseDate || !genre || !director || !hero ||!heroine || !plot ) {
            return res.status(400).json({error: "All fields are required"})
        }

        if(!req.file) {
            return res.status(400).json({error: "Image not found"})
        }

        const movieExist = await movieDb.findOne({name}) 
        if(movieExist) {
            return res.status(400).json({error: "Movie already exist"})
        }
        const cloudinaryResponse = await uploadToCloudinary(req.file.path)
        console.log(cloudinaryResponse, "response")
        
        const newMovie = new movieDb({
            name, language, releaseDate, genre, director, hero, heroine, plot, image: cloudinaryResponse
        })

        let savedMovie = await newMovie.save()
        if(savedMovie) {
            return res.status(200).json({message: "Movie added successfully", savedMovie})
        }

        console.log(req.file, "Image uploaded by multer")
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

//List all movies
const listMovies = async (req,res) => {
    try {
        const movieList = await movieDb.find()
        return res.status(200).json(movieList)
        
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const movieDetails = async (req,res) => {
    try {
        const {movieId} = req.params;
        const movieData = await movieDb.findById({_id: movieId}) 
        if(!movieData) {
            return res.status(400).json({error: "Movie not found"})
        }
        return res.status(200).json(movieData)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

//Update a movie details
const updateMovie = async (req,res) => {
    try {
        const {movieId} = req.params;
        const {name, language, releaseDate, genre, director, hero, heroine, plot} = req.body
        let imageUrl;

        let movieExist = await movieDb.findById(movieId)
        if(!movieExist) {
            return res.status(404).json({error: "Movie not found"})
        }

        if(req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file.path)
            imageUrl = cloudinaryResponse
        }

        const updatedMovie = await movieDb.findByIdAndUpdate(movieId, 
            {name, language, releaseDate, genre, director, hero, heroine, plot, image: imageUrl},
            { new: true, runValidators: true }
        )
        return res.status(200).json({message: "Movie updated successfully", updatedMovie})

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

//Delete a movie
const deleteMovie = async (req,res) => {
    try {
        const {movieId} = req.params;
        const deleteMovie = await movieDb.findByIdAndDelete(movieId)
        if(!deleteMovie) {
            return res.status(400).json({error: "Movie not found"})
        }
        return res.status(200).json({message: "Movie deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}


//Search a movie
const searchMovie = async (req, res) => {
    try {
      const searchQuery = req.query.search || "";
      const movies = await movieDb.find({
        name: { $regex: searchQuery, $options: "i" }
      });
      res.status(200).json(movies);
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
  };


module.exports = {
    addMovie, 
    listMovies,
    movieDetails,
    updateMovie,
    deleteMovie,
    searchMovie
}


