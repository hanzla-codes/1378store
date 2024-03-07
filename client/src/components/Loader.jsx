import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className='text-center py-2'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
