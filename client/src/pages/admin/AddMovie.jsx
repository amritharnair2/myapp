import React, { useState } from "react";
import { addMovie } from "../../services/AdminServices"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddMovie() {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please upload an image");
      return;
    }

    const formData = new FormData();
    for (let key in movieData) {
      formData.append(key, movieData[key]);
    }
    formData.append("image", image);

    try {
      const res = await addMovie(formData);
      setMessage(res.message);
      toast.success("Movie added successfully")
      setTimeout(() => navigate("/admin"), 2000); 
    } catch (err) {
      setMessage(err?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Movie</h1>
      {message && (
        <div className="mb-4 text-center text-sm text-red-500">{message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset className="space-y-4">
          {[
            { name: "name", label: "Movie Name", type: "text" },
            { name: "director", label: "Director", type: "text" },
            { name: "hero", label: "Hero", type: "text" },
            { name: "heroine", label: "Heroine", type: "text" },
          ].map((field) => (
            <div className="mb-4" key={field.name}>
              <label className="block text-sm mb-2">{field.label}:</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="input input-bordered w-full bg-white/80 text-black"
                value={movieData[field.name]}
                onChange={handleChange}
                required
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
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Add Movie
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddMovie;

