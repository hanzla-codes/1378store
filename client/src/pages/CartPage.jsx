import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import NotFound from "../components/NotFound";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

export const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeItem = (productId) => {
    // remove  item from cart.
    dispatch(removeFromCart(productId));
    toast.info("Item removed from cart");
  };
  const roundNumbers = (value) => {
    return +Math.round(value).toFixed(2);
  };

  const subTotal = roundNumbers(
    cartItems.reduce((pre, cur) => {
      return (pre += cur.price * cur.qty);
    }, 0)
  );

  const updateQty = (item, qty) => {
    const payload = {
      name: item.name,
      image: item.image,
      qty: Number(qty),
      price: item.price,
      countInStock: item.countInStock,
      product: item.product,
    };
    // update item to cart.
    dispatch(addToCart(payload));
    toast.info(`${item.name} updated.`);
  };

  const saleTax = roundNumbers((subTotal / 100) * 16);

  const totalPrice = roundNumbers(subTotal + saleTax);

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className='pt-3'>
          <Row>
            <Col>
              <h3>Shopping Cart</h3>
              <hr />
              <Link to='/' className='fs-5'>
                Continue Shopping
              </Link>
              <hr />
            </Col>
          </Row>
          <Row>
            <ListGroup variant='flush'>
              <ListGroup.Item className='list-group-item-primary text-dark'>
                <Row>
                  <Col xs={6}>Product</Col>
                  <Col xs={2}>Price</Col>
                  <Col xs={2}>Quantity</Col>
                  <Col xs={2} className='text-end'>
                    Total
                  </Col>
                </Row>
              </ListGroup.Item>
              {cartItems.map((p) => (
                <ListGroup.Item
                  key={p.product}
                  className='list-group-item-primary text-dark'
                >
                  <Row>
                    <Col xs={6}>
                      <Image src={p.image} style={{ width: "50px" }} />
                      <span className='px-2'>{p.name}</span>
                    </Col>
                    <Col xs={2}>{p.price}</Col>
                    <Col xs={2}>
                      <Form.Group>
                        <Form.Select
                          disabled={p.countInStock === 0}
                          onChange={(e) => updateQty(p, e.target.value)}
                          value={p.qty}
                        >
                          {[...Array(p.countInStock).keys()].map(
                            (value) =>
                              value < 5 && (
                                <option key={value} value={value + 1}>
                                  {value + 1}
                                </option>
                              )
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={2} className='text-end'>
                      {p.price * p.qty}/-{" "}
                      <FaTimes
                        className='text-danger ps-2 cursor-pointer'
                        onClick={() => removeItem(p.product)}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Row>
          <Row className='justify-content-end fs-5'>
            <Col md={5}>
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
                    <Col className='fs-3'>Grand Total:</Col>
                    <Col className='text-end fs-3'>
                      {totalPrice}
                      /-
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item-primary text-dark'>
                  <Stack className='py-3'>
                    <Button as={NavLink} to='/checkout'>
                      Checkout
                    </Button>
                  </Stack>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default CartPage;
