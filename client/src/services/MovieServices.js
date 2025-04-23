
import { userInstance } from "../axios/axiosInstance"

//Get a single movie details
export const singleMovieDetails = (movieId) => {
    return userInstance.get(`/movie/moviedetails/${movieId}`);
};
  
//list all movies
export const listMovies = (data) => {
    return userInstance.get("/movie/listmovies", data)
}

//search movies
export const searchMovies = (search) => {
    return userInstance.get('/movie/searchmovie', { params: { search } })
}