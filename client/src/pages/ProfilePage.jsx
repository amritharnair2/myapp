import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteReview, getUserReviews, updateReview } from '../services/ReviewServices'; // Adjust path as needed
import StarRating from '../components/StarRating';
import EditReviewForm from '../components/EditReviewForm';

function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        setLoading(true);
        const response = await getUserReviews(user._id);
        console.log('Fetched Reviews:', response.data.reviews);
        setUserReviews(response.data.reviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to load reviews');
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserReviews();
    }
  }, [user]);

  const handleEditReview = async (updatedData) => {
    try {
      const response = await updateReview(editingReview._id, updatedData);
      setUserReviews((prev) =>
        prev.map((r) => (r._id === response.data.review._id ? response.data.review : r))
      );
      toast.success("Review updated successfully");
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this review?");
      if (!confirmDelete) return;
  
      await deleteReview(reviewId); 
      setUserReviews(userReviews.filter((review) => review._id !== reviewId)); 
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.profilepic || '/default-profile.png'}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border"
          />
          <div className="text-center md:text-left">
            <h2>
              Name: <span>{user?.name}</span>
            </h2>
            <p>
              Email: <span>{user?.email}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/editprofile')}
          className="bg-blue-600 btn-sm text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      </div>

      <div className="w-full mt-12">
        <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

        {loading ? (
          <div className="text-center py-4">
          <div className="inline-block w-6 h-6 border-4 border-t-transparent border-primary border-solid rounded-full animate-spin"></div>
        </div>
        
        ) : (
          <div className="overflow-x-auto">
            <table className="table text-sm text-left">
            <thead className='text-black'>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Movie</th>
                  <th className="p-3 text-left">Rating</th>
                  <th className="p-3 text-left">Review</th>
                  <th className="p-3 text-left">Date and Time</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {userReviews.length > 0 ? (
                  userReviews.map((review) => (
                    <tr key={review._id} className="border-b border-gray-200">
                      <td className="p-3">
                        {review.movie.name || review.movie?.title || 'Untitled'}
                      </td>
                      <td className="p-3">
                        <div className="flex text-xl">
                        <StarRating rating={review.rating} />
                        </div>
                      </td>
                      <td className="p-3">
                        {review.review || review.content || 'No comment'}
                      </td>
                      <td className="p-3">
                        {review.date || new Date(review.createdAt).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setEditingReview(review)}
                            className="px-1 hover:text-blue-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="hover:text-red-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-3 text-center">
                      No reviews yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <EditReviewForm
  show={!!editingReview}
  onClose={() => setEditingReview(null)}
  existingReview={editingReview}
  onSubmit={handleEditReview}
/>
    </div>
  );
}

export default ProfilePage;
