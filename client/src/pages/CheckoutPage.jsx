import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartInfo from "../components/CartInfo";
import PaymentInfo from "../components/PaymentInfo";
import ShippingInfo from "../components/ShippingInfo";
import StripeContainer from "../components/StripeContainer";
import { useDispatch, useSelector } from "react-redux";
import { orderReset } from "../redux/orderSlice";

const CheckoutPage = () => {
  const { success, orderId } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // reset order when moving from this page
      if (success) {
        dispatch(orderReset());
      }
    };
  }, []);

  return (
    <div>
      <div className='pt-3'>
        {success ? (
          <p>
            Order created successfully{" "}
            <Link to={`/orders/${orderId}`}>View Order</Link>
          </p>
        ) : (
          <Row>
            <Col md={6}>
              <ShippingInfo />
              <CartInfo />
            </Col>
            <Col md={6}>
              <PaymentInfo />
              <StripeContainer />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
