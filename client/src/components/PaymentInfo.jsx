import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const PaymentInfo = () => {
  const { subTotal, shippingPrice, saleTax, totalPrice } = useSelector(
    (state) => state.cart
  );
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3>Payment</h3>
          <hr />
        </Col>
        <Col md={12}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='list-group-item-primary text-dark'>
              <Row>
                <Col>Subtotal:</Col>
                <Col className='text-end'>{subTotal}/-</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='list-group-item-primary text-dark'>
              <Row>
                <Col>Tax (16%):</Col>
                <Col className='text-end'>
                  {saleTax}
                  /-
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='list-group-item-primary text-dark'>
              <Row>
                <Col>Shipping:</Col>
                <Col className='text-end'>
                  {shippingPrice}
                  /-
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='list-group-item-primary text-dark'>
              <Row>
                <Col className='fs-3'>Grand Total:</Col>
                <Col className='text-end fs-3'>
                  {totalPrice}
                  /-
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentInfo;
