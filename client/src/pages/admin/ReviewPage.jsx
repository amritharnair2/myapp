import React, { useEffect, useState } from 'react';
import { listReviews } from '../../services/AdminServices';
import StarRating from '../../components/StarRating';


const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await listReviews();
        const reviewsAsc = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReviews(reviewsAsc);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);


  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const time = date.toTimeString().split(" ")[0];
    return `${formattedDate}, ${time}`;
  };

  return (
    <div className=' text-black'>
      <section>
        <h2 className="text-2xl font-bold text-black">Reviews</h2>
        <table className="w-full text-left border border-black mt-5">
          <thead className="bg-gray-400 text-black font-bold">
            <tr>
              <th className="p-2 border border-black">User</th>
              <th className="p-2 border border-black">Movie</th>
              <th className="p-2 border border-black">Review</th>
              <th className="p-2 border border-black">Rating</th>
              <th className="p-2 border border-black">Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="bg-white border border-black">
                <td className="p-2 border border-black text-black">{review.user.name}</td>
                <td className="p-2 border border-black text-black">{review.movie.name}</td>
                <td className="p-2 border border-black text-black">{review.review}</td>
                <td className="p-2 border border-black text-black">  <StarRating rating={review.rating} /></td>
                <td className="p-2 border border-black text-black">{formatDate(review.createdAt)}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminReviewsPage;


