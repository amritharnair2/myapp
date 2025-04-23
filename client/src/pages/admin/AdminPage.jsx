import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { deleteMovie } from '../../services/AdminServices';
import { toast } from 'react-toastify';
import { listMovies } from '../../services/MovieServices';

const AdminPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await listMovies();
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, []);

  const handleAddMovie = () => {
    navigate('/admin/addmovie');
  };

  const handleUpdateMovie = (movieId) => {
    navigate(`/admin/updatemovie/${movieId}`);
  };

  const handleViewDetails = (movieId) => {
    navigate(`/admin/singlemovie/${movieId}`);
  };
  


    const handleDeleteMovie = async (movieId) => {
      try {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if (!confirmDelete) return;
    
        await deleteMovie(movieId); 
        setMovies(movies.filter((movie) => movie._id !== movieId)); 
        toast.success('Movie deleted successfully');
      } catch (error) {
        console.error('Error deleting movie:', error);
        toast.error('Failed to delete movie');
      }
    };

  return (
    <div className="text-white font-serif">
      {/* Main Content */}
      <main className="text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">Movies</h2>
          <button
            onClick={handleAddMovie}
            className="px-4 py-2 bg-accent text-black border border-black hover:bg-gray-200"
          >
            Add Movie
          </button>
        </div>

        <table className="w-full text-left  table border-black mt-5">
          <thead className="bg-gray-300 text-black">
            <tr>
              <th className="p-2 border text-center border-black w-1/6">Movie</th>
              <th className="p-2 border text-center border-black w-1/6">Name</th>
              <th className="p-2 border text-center border-black w-1/6">Release Date</th>
              <th className="p-2 border text-center border-black w-1/6">Genre</th>
              <th className="p-2 border text-center border-black w-1/6">Language</th>
              <th className="p-2 border text-center border-black w-1/6">Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id} className="bg-white border border-black">
                <td className="p-2 border border-black">
                  <img src={movie.image} alt={movie.name} className="w-full h-auto object-cover" />
                </td>
                <td className="p-2 border text-center border-black text-black">{movie.name}</td>
                <td className="p-2 border text-center border-black text-black">
                  {new Date(movie.releaseDate).toLocaleDateString('en-GB')}
                </td>
                <td className="p-2 border text-center border-black text-black">{movie.genre}</td>
                <td className="p-2 border text-center border-black text-black">{movie.language}</td>
                <td className="p-2 border border-black">
                  <div className="flex justify-center items-center gap-2">
                  <button className="text-green-600 hover:text-green-800" onClick={() => handleViewDetails(movie._id)}>
      <Eye />
    </button>
                    <button onClick={() => handleUpdateMovie(movie._id)} className="text-blue-600 hover:text-blue-800">
                      <Pencil />
                    </button>
                    <button onClick={() => handleDeleteMovie(movie._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </main>
    </div>
  );
};

export default AdminPage;

