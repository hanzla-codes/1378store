import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Badge,
  Form,
  Button,
} from "react-bootstrap";
import apiClient from "../../services/api-client";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import Error from "../components/AlertMessage";
import Rating from "../components/Rating";
const ProductPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    apiClient
      .get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const addItemToCart = () => {
    const payload = {
      name: product.name,
      image: product.image,
      qty: Number(qty),
      price: product.price,
      countInStock: product.countInStock,
      product: product._id,
    };
    // add item to cart.
    dispatch(addToCart(payload));
    toast.success(`${product.name} added to cart`);
    navigate("/cart");
  };

  if (loading) {
    return (
      <Row className='py-5'>
        <Col>
          <Loader />
        </Col>
      </Row>
    );
  }
  if (error) {
    return (
      <Row>
        <Col>
          <Error>{error}</Error>
        </Col>
      </Row>
    );
  }
  return (
    <Row className='py-3'>
      <Col md={5}>
        <Image src={product.image} fluid />
      </Col>
      <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroup.Item as='h4' className='list-group-item-primary text-dark'>
            {product.name}
          </ListGroup.Item>
          <ListGroup.Item className='list-group-item-primary text-dark'>
            Category <span className='float-end'>{product.category}</span>
          </ListGroup.Item>
          <ListGroup.Item className='list-group-item-primary text-dark'>
            Fabric<span className='float-end'>{product.fabric}</span>
          </ListGroup.Item>
          <ListGroup.Item className='list-group-item-primary text-dark'>
            Rating
            <span className='float-end'>
              <Rating
                value={product.rating}
                text={` from ${product.numReviews} users`}
              />
            </span>
          </ListGroup.Item>
          <ListGroup.Item className='list-group-item-primary text-dark'>
            Color <span className='float-end'>{product.color}</span>
          </ListGroup.Item>
          <ListGroup.Item className='list-group-item-primary text-dark'>
            {product.description}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <ListGroup variant='flush'>
          <ListGroup.Item as='h3' className='list-group-item-primary text-dark'>
            Rs. {product.price}/-
          </ListGroup.Item>
          <ListGroup.Item className='list-group-item-primary text-dark'>
            Stock
            <span className='float-end'>
              {product.countInStock > 0 ? (
                <Badge bg='success'>Available</Badge>
              ) : (
                <Badge bg='danger'>Out of stock</Badge>
              )}
            </span>
          </ListGroup.Item>
          <ListGroup.Item className='list-group-item-primary text-dark'>
            <Form.Select
              onChange={(e) => setQty(e.target.value)}
              disabled={product.countInStock < 1}
            >
              {[...Array(product.countInStock).keys()].map((stock) => {
                return stock < 5 ? (
                  <option key={stock} defaultValue={qty} value={stock + 1}>
                    {stock + 1}
                  </option>
                ) : null;
              })}
            </Form.Select>
          </ListGroup.Item>
          <ListGroup.Item className='list-group-item-primary text-dark'>
            <div className='d-grid'>
              <Button
                onClick={addItemToCart}
                disabled={product.countInStock < 1}
              >
                Add to Cart
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProductPage;
