import { useState, useEffect } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import AlertMessage from "../components/AlertMessage";
import apiClient from "../../services/api-client";
import Loader from "../components/Loader";
import Rating from "../components/Rating";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        let message =
          err.response.data && err.response.data.message
            ? err.response.data.message
            : err.message;
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <AlertMessage>
        <h2>Error!</h2>
        <p>{error}</p>
      </AlertMessage>
    );
  }

  return (
    <Row>
      {products.map((product) => {
        return (
          <Col key={product._id} xl={3} lg={4} md={6}>
            <Card className='my-2 product-card'>
              <Card.Img variant='top' src={product.image} height='250px' />
              <Card.Body>
                <Card.Title className='fs-5'>{product.name}</Card.Title>
                <Card.Text className='fw-bold fs-5'>
                  Rs {product.price}/-
                </Card.Text>
                <Card.Text>
                  <Rating
                    value={product.rating}
                    text={` from ${product.numReviews} users`}
                  />
                </Card.Text>
                <Button
                  as={NavLink}
                  to={`/products/${product._id}`}
                  variant='primary'
                >
                  View Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default HomePage;
