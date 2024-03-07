import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import AlertMessage from "./AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../services/api-client";
import Loader from "./Loader";
import { orderSuccess } from "../redux/orderSlice";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    cartItems,
    shippingAddress,
    subTotal,
    shippingPrice,
    saleTax,
    totalPrice,
  } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    if (elements == null) {
      return;
    }
    setLoading(true);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const payment = {
      id: paymentMethod.id,
      card: paymentMethod.card.brand,
      last4: paymentMethod.card.last4,
    };

    try {
      const reqData = {
        orderItems: cartItems,
        shippingAddress,
        saleTax,
        shippingPrice,
        subTotal,
        totalPrice,
        paymentMethod: payment,
      };

      const { data } = await apiClient.post("/orders", reqData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const { _id } = data;
      dispatch(orderSuccess(_id));
      // Order compelted
    } catch (err) {
      let message =
        err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className='p-3'>
      {error && (
        <Col md={12}>
          <AlertMessage>{error}</AlertMessage>
        </Col>
      )}
      {loading && (
        <Col md={12}>
          <Loader />
        </Col>
      )}
      <Col md={12}>
        <Form onSubmit={onSubmit}>
          <Form.Group className='mb-2'>
            <Form.Label>Card Number</Form.Label>
            <CardNumberElement className='form-control' />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Card Number</Form.Label>
            <CardCvcElement className='form-control' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Card Number</Form.Label>
            <CardExpiryElement className='form-control' />
          </Form.Group>
          <Button className='w-100' type='submit'>
            Pay Now
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default StripeForm;
