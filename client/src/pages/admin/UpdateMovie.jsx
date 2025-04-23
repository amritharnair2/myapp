import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateMovie } from "../../services/AdminServices";
import { toast } from "react-toastify";
import { singleMovieDetails } from "../../services/MovieServices";

function UpdateMoviePage() {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [movieData, setMovieData] = useState({
    name: "",
    language: "",
    releaseDate: "",
    genre: "",
    director: "",
    hero: "",
    heroine: "",
    plot: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await singleMovieDetails(movieId);
        setMovieData({
          name: res.data.name || "",
          language: res.data.language || "",
          releaseDate: res.data.releaseDate?.slice(0, 10) || "",
          genre: res.data.genre || "",
          director: res.data.director || "",
          hero: res.data.hero || "",
          heroine: res.data.heroine || "",
          plot: res.data.plot || "",
        });
      } catch (err) {
        console.log("Error fetching movie details:", err);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData including ALL fields (even empty ones)
    const formData = new FormData();
    for (let key in movieData) {
      formData.append(key, movieData[key]);
    }
  
    if (image) {
      formData.append("image", image);
    }
  
    // Debug what's in the FormData
    // console.log("FormData contents:");
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  
    try {
      const res = await updateMovie(movieId, formData);
    console.log(res)
      toast.success("Movie updated successfully!");
      navigate("/admin")
    } catch (err) {
      console.error("Update error:", err);
      console.error("Response data:", err.response?.data);
      setMessage(err.response?.data?.error || err.message || "Update failed");
      toast.error("Update failed! See console for details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Update Movie</h1>
      {message && (
        <div className="mb-4 text-center text-sm text-red-500">{message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset className="space-y-4">
          {[{ name: "name", label: "Movie Name", type: "text" },
            { name: "director", label: "Director", type: "text" },
            { name: "hero", label: "Hero", type: "text" },
            { name: "heroine", label: "Heroine", type: "text" }].map((field) => (
            <div className="mb-4" key={field.name}>
              <label className="block text-sm mb-2">{field.label}:</label>
              <input
                type={field.type}
                name={field.name}
                className="input input-bordered w-full bg-white/80 text-black"
                value={movieData[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm mb-2">Language:</label>
            <select
              name="language"
              className="input input-bordered w-full bg-white/80 text-black"
              value={movieData.language}
              onChange={handleChange}
            >
              <option value="">Select Language</option>
              <option>English</option>
              <option>Malayalam</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Genre:</label>
            <select
              name="genre"
              className="input input-bordered w-full bg-white/80 text-black"
              value={movieData.genre}
              onChange={handleChange}
            >
              <option value="">Select Genre</option>
              <option>Action</option>
              <option>Drama</option>
              <option>Comedy</option>
              <option>Romance</option>
              <option>Thriller</option>
              <option>Crime</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Release Date:</label>
            <input
              type="date"
              name="releaseDate"
              className="input input-bordered w-full bg-white/80 text-black"
              value={movieData.releaseDate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Plot Summary:</label>
            <textarea
              name="plot"
              placeholder="Enter plot summary"
              rows="5"
              className="input input-bordered w-full bg-white/80 text-black h-16"
              value={movieData.plot}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Movie Poster:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-white/80 text-black"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Update Movie
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default UpdateMoviePage;
