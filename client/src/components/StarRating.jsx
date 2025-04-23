import { AiFillStar, AiOutlineStar, AiOutlineStar as AiHalfStar } from "react-icons/ai";

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const validRating = Number(rating) || 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < maxStars; i++) {
      if (i < Math.floor(validRating)) {
        stars.push(
          <AiFillStar key={i} className="text-yellow-500 text-lg" />
        );
      } else if (i === Math.floor(validRating) && validRating % 1 >= 0.5) {
        stars.push(
          <div key={i} className="relative">
            <AiOutlineStar className="text-gray-400 text-lg" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <AiFillStar className="text-yellow-500 text-lg" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <AiOutlineStar key={i} className="text-gray-400 text-lg" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex">
      {renderStars()}
    </div>
  );
};

export default StarRating;
