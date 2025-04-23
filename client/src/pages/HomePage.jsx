import React, { useEffect, useState, useRef } from 'react';
import { listMovies } from '../services/MovieServices'; // Removed unused searchMovies
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import debounce from 'lodash.debounce';

function HomePage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [languageFilter, setLanguageFilter] = useState('All');
  const [genreFilter, setGenreFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await listMovies();
        setMovies(res.data);
        setAllMovies(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    searchRef.current = debounce((query) => {
      setSearchTerm(query);
    }, 300);
    return () => searchRef.current?.cancel();
  }, []);

  useEffect(() => {
    let filtered = [...allMovies];

    if (searchTerm.trim()) {
      filtered = filtered.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (languageFilter !== 'All') {
      filtered = filtered.filter((movie) => movie.language === languageFilter);
    }

    if (genreFilter !== 'All') {
      filtered = filtered.filter((movie) => movie.genre === genreFilter);
    }

    setMovies(filtered);
  }, [searchTerm, languageFilter, genreFilter, allMovies]);

  const handleSearchChange = (e) => {
    searchRef.current(e.target.value);
  };

  return (
    <div>
   <div className="flex flex-col lg:flex-row justify-between mb-5 gap-4">
  {/* Search Input */}
  <div className="w-full lg:w-[40%] mt-6">
    <div className="relative">
      <input
        type="text"
        placeholder="Search Movie"
        className="input input-bordered w-full pr-12 text-lg"
        onChange={handleSearchChange}
      />
      <svg
        className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zm-6 4a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.817-4.817A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>

  {/* Language Filter */}
  <div className="w-full lg:w-[20%]">
    <label className="block mb-1 text-sm">Select Language</label>
    <select
      className="select select-bordered w-full"
      value={languageFilter}
      onChange={(e) => setLanguageFilter(e.target.value)}
    >
      <option>All</option>
      <option>English</option>
      <option>Malayalam</option>
      <option>Hindi</option>
      <option>Tamil</option>
      <option>Telugu</option>
    </select>
  </div>

  {/* Genre Filter */}
  <div className="w-full lg:w-[20%]">
    <label className="block mb-1 text-sm">Select Genre</label>
    <select
      className="select select-bordered w-full"
      value={genreFilter}
      onChange={(e) => setGenreFilter(e.target.value)}
    >
      <option>All</option>
      <option>Action</option>
      <option>Drama</option>
      <option>Comedy</option>
      <option>Romance</option>
      <option>Thriller</option>
      <option>Crime</option>
    </select>
  </div>
</div>

      {/* Movie Cards */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center text-xl font-semibold text-gray-500 mt-10">
          No results found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div
              key={movie?._id}
               className="border border-gray-300 p-3 shadow-md dark:border-gray-700 cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary dark:hover:border-blue-400"
              onClick={() => navigate(`/movie/${movie._id}`)}
            >
              <img
                src={movie?.image}
                alt="Movie"
                className="w-full h-60 pb-3 rounded"
              />
              <h1 className="text-xl font-semibold">
                {movie?.name} ({new Date(movie?.releaseDate).getFullYear()})
              </h1>
              <hr className="my-2 border-black dark:border-white" />
              <div className="flex justify-between text-sm my-3">
                <span>Language</span>
                <span className="capitalize">{movie?.language}</span>
              </div>
              <div className="flex justify-between text-sm my-3">
                <span>Genre</span>
                <span className="capitalize">{movie?.genre}</span>
              </div>
              <div className="flex justify-between text-sm my-3">
                <span>Rating</span>
                <span>
                  <StarRating rating={movie?.rating} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
