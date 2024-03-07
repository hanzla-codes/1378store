import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import apiClient from "../../services/api-client";
import AlertMessage from "../components/AlertMessage";

const OrderPage = () => {
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        setOrder(data);
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
  }, [id, userInfo]);

  return (
    <div className='pt-3'>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage>{error}</AlertMessage>
      ) : (
        order && (
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='list-group-item-primary text-dark'>
                  <h3>
                    Order # <small>{order._id}</small>{" "}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item-primary text-dark'>
                  <h4>User </h4>
                  <strong>Name :</strong> {order.user.name}
                  <br />
                  <strong>Email :</strong>{" "}
                  <a href={`mailto:${order.user.email}`}>
                    {" "}
                    {order.user.email}{" "}
                  </a>
                  <br />
                  <strong>Phone :</strong> {order.shippingAddress.phone}
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item-primary text-dark'>
                  <h4>Shipping</h4>
                  <p>
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                    ,{order.shippingAddress.country}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item className='list-group-item-primary text-dark'>
                  <h4>Payment Method</h4>
                  <strong>Method :</strong> {order.paymentMethod.card} *********{" "}
                  {order.paymentMethod.last4}
                  <br />
                  {order.isPaid ? (
                    <AlertMessage variant='success'>
                      Order is paid at {order.paidAt}
                    </AlertMessage>
                  ) : (
                    <AlertMessage variant='danger'>
                      Order is not paid
                    </AlertMessage>
                  )}
                </ListGroup.Item>

                <ListGroup.Item className='list-group-item-primary text-dark'>
                  <h4>Delivery Status</h4>{" "}
                  {order.isDelivered ? (
                    <AlertMessage variant='success'>
                      Order is delivered at {order.deliveredAt}
                    </AlertMessage>
                  ) : (
                    <AlertMessage variant='danger'>
                      Order is not delivered
                    </AlertMessage>
                  )}
                </ListGroup.Item>

                <ListGroup.Item className='list-group-item-primary text-dark'>
                  <h3>Order Items</h3>
                  {order.orderItems.length === 0 ? (
                    <AlertMessage variant='info'>
                      You do not have any orders.
                    </AlertMessage>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((cartItem, index) => (
                        <ListGroup.Item
                          key={index}
                          className='list-group-item-primary text-dark'
                        >
                          <Row>
                            <Col md={1}>
                              <Image src={cartItem.image} fluid />
                            </Col>
                            <Col>
                              <Link to={`/products/${cartItem.product}`}>
                                {cartItem.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {cartItem.qty} x {cartItem.price} = Rs{" "}
                              {(cartItem.qty * cartItem.price).toFixed(2)}/-
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='list-group-item-primary text-dark'>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item className='list-group-item-primary text-dark'>
                    <Row>
                      <Col>Subtotal:</Col>
                      <Col className='text-end'>{order.subTotal}/-</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='list-group-item-primary text-dark'>
                    <Row>
                      <Col>Tax (16%):</Col>
                      <Col className='text-end'>
                        {order.saleTax}
                        /-
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='list-group-item-primary text-dark'>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col className='text-end'>
                        {order.shippingPrice}
                        /-
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='list-group-item-primary text-dark'>
                    <Row>
                      <Col className='fs-3'>Grand Total:</Col>
                      <Col className='text-end fs-3'>
                        {order.totalPrice}
                        /-
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      )}
    </div>
  );
};

export default OrderPage;
