import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import findItem from "../assets/search.svg";

const NotFound = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className='not-found'>
      <div className='h-auto text-center'>
        <img
          src={findItem}
          alt='search'
          className='img-fluid'
          style={{ width: "350px" }}
        />
        <p className='fs-3'>{text ? text : "Ups!... no result found"}</p>
        <Link onClick={() => navigate(-1)}>Go Back</Link>
      </div>
    </div>
  );
};

export default NotFound;
