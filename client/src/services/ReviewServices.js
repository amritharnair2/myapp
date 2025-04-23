import { userInstance } from "../axios/axiosInstance";

// Add a review

export const addReview = (reviewData) => {
  return userInstance.post("/review/addreview", reviewData);
};


// Get all reviews for a specific movie
export const getMovieReviews = (movieId) => {
  return userInstance.get(`/review/getreview/${movieId}`);
};

// Get all reviews by a specific user
export const getUserReviews = (userId) => {
  return userInstance.get(`review/userreview/${userId}`);
};

// Update a review by review ID
export const updateReview = (id, updatedData) => {
  return userInstance.put(`/review/updatereview/${id}`, updatedData);
};

// Delete a review by review ID
export const deleteReview = (id) => {
  return userInstance.delete(`/review/deletereview/${id}`);
};
