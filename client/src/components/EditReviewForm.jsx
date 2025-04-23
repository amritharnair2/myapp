import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const EditReviewForm = ({ show, onClose, onSubmit, existingReview }) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState(existingReview?.review || "");

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setReview(existingReview.review);
    }
  }, [existingReview]);

  const handleUpdate = async () => {
    if (rating === 0 || !review.trim()) {
      alert("Please select a rating and write a review.");
      return;
    }
    await onSubmit({ rating, review });
    onClose();
  };

  if (!show) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Review</h3>

        {/* Rating Section */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, index) => {
            const current = index + 1;
            return (
              <FaStar
                key={index}
                className="text-2xl cursor-pointer transition"
                color={current <= (hover || rating) ? "#facc15" : "#d1d5db"}
                onClick={() => setRating(current)}
                onMouseEnter={() => setHover(current)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>

        {/* Review Textarea */}
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Edit your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="modal-action">
          <button className="btn btn-warning" onClick={handleUpdate}>Update</button>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
};

export default EditReviewForm;
