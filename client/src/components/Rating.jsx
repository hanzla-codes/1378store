import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const Rating = ({ value, text }) => {
  const ratings = [1, 2, 3, 4, 5];
  return (
    <>
      {ratings.map((rating, index) => {
        if (rating < value) {
          return <FaStar key={index} />;
        } else if (rating - 0.5 === value) {
          return <FaStarHalfAlt key={index} />;
        } else {
          return <FaRegStar key={index} />;
        }
      })}
      {text && <span>{text}</span>}
    </>
  );
};

export default Rating;
