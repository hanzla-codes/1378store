import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const CartInfo = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Container className='mt-3'>
      <Row>
        <Col md={12}>
          <h3>Order Items</h3>
          <hr />
        </Col>
        <Col md={12}>
          {cartItems.map((item) => (
            <Card className='p-3 my-3' key={item.product}>
              <Row className='g-0'>
                <Col md='4'>
                  <Image src={item.image} fluid className='rounded-start' />
                </Col>
                <Col md='8'>
                  <Card.Body>
                    <Card.Title>
                      {item.name}
                      <small className='text-muted'> ({item.qty}x)</small>
                    </Card.Title>
                    <Card.Title>1x {item.price}/-</Card.Title>
                    <Card.Text className='h3'>
                      Total : {item.price * item.qty}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CartInfo;
