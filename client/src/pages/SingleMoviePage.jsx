import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleMovieDetails } from "../services/MovieServices";
import { addReview, getMovieReviews } from "../services/ReviewServices";
import { toast } from "react-toastify";
import ReviewForm from "../components/ReviewForm";
import StarRating from "../components/StarRating";

const SingleMoviePage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const time = date.toTimeString().split(" ")[0];
    return `${formattedDate}, ${time}`;
  };

  const handleReviewSubmit = async ({ rating, review }) => {
    try {
      const userData = localStorage.getItem("user");
      const user = JSON.parse(userData);
      const userId = user?._id;

      const payload = {
        user: userId,
        movie: movieId,
        rating,
        review,
      };

      const res = await addReview(payload);

      if (res?.data?.updatedMovie?.rating) {
        setMovie((prev) => ({
          ...prev,
          rating: res.data.updatedMovie.rating,
        }));
      }

      toast.success("Review added!", { position: "top-center" });
      console.log(res)
      // Refetch updated reviews
      const updatedReviews = await getMovieReviews(movieId);
      setReviews(updatedReviews.data);
      setShowReviewForm(false);
    } catch (err) {
      console.error("Review submit error:", err);
      toast.error("Failed to add review", { position: "top-center" });
      setShowReviewForm(false);
    }
  };

  const hasUserReviewed = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    return reviews.some((review) =>
      typeof review.user === "object"
        ? review.user._id === userId
        : review.user === userId
    );
  };

  // const renderStars = (rating) => {
  //   const totalStars = 5;
  //   const filledStars = rating || 0;
  //   const emptyStars = totalStars - filledStars;

  //   const stars = [
  //     ...Array(filledStars).fill("★"),
  //     ...Array(emptyStars).fill("☆"),
  //   ];

  //   return stars.map((star, idx) => (
  //     <span
  //       key={idx}
  //       className={star === "★" ? "text-yellow-500" : "text-gray-300"}
  //     >
  //       {star}
  //     </span>
  //   ));
  // };

  useEffect(() => {
    if (!movieId) return;

    setLoadingReviews(true);

    singleMovieDetails(movieId)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
      });

    getMovieReviews(movieId)
      .then((res) => {
        setReviews(res.data);
        setLoadingReviews(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoadingReviews(false);
      });
  }, [movieId]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-3xl text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-5xl">
        <h2 className="text-3xl font-bold mb-6">{movie.name}</h2>

        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full md:w-1/3 h-auto object-cover"
          />

          <div className="flex-1 grid grid-cols-[auto_1fr] gap-x-32 gap-y-1 text-sm sm:text-base">
            <p className="font-semibold">Language:</p>
            <p>{movie.language}</p>

            <p className="font-semibold">Genre:</p>
            <p>{movie.genre}</p>

            <p className="font-semibold">Rating:</p>
            <p>{movie.rating}</p>

            <p className="font-semibold">Release Date:</p>
            <p>
              {new Date(movie.releaseDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>

            <p className="font-semibold">Director:</p>
            <p>{movie.director}</p>

            <p className="font-semibold">Hero:</p>
            <p>{movie.hero}</p>

            <p className="font-semibold">Heroine:</p>
            <p>{movie.heroine}</p>
          </div>
        </div>

        {movie.plot && <p className="mt-6 leading-relaxed">{movie.plot}</p>}
      </div>

      <hr className="my-4 border-black dark:border-white" />

      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold">Reviews</span>
        {hasUserReviewed() ? (
          <button
            className="btn btn-disabled"
            title="You have already reviewed this movie"
          >
            Already Reviewed
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setShowReviewForm(true)}
          >
            Add Review
          </button>
        )}
      </div>

      <ReviewForm
        show={showReviewForm}
        onClose={() => setShowReviewForm(false)}
        onSubmit={handleReviewSubmit}
      />

      <div className="space-y-4">
        {loadingReviews ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-4 border border-black dark:border-white rounded shadow-sm"
            >
              <div className="flex justify-between items-center gap-2">
                <span className="font-bold">{rev?.user?.name || "User"}</span>
                <span className="text-sm text-gray-400">
                  {formatDate(rev.updatedAt)}
                </span>
              </div>
              {typeof rev.rating === "number" &&
              rev.rating > 0 &&
              rev.rating <= 5 ? (
                <div className="text-yellow-500 mt-2"> <StarRating rating={rev.rating} /></div>
              ) : (
                <p>No rating yet</p>
              )}
              <div className="mt-2">{rev?.review}</div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default SingleMoviePage;




