import { Form, Formik } from "formik";
import { Button, Col, Container, Row } from "react-bootstrap";
import TextField from "./TextField";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../redux/cartSlice";

const validationSchema = yup.object({
  street: yup.string().required("Street address is required."),
  city: yup.string().required("City name is required."),
  country: yup.string().required("Country name is required."),
  phone: yup
    .number("Phone number only contains digits.")
    .required("Phone number is required."),
  extraDetails: yup.string(),
});

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const initialValues = {
    street: "",
    city: "",
    country: "",
    phone: "",
    extraDetails: "",
  };

  const { shippingAddress } = useSelector((state) => state.cart);
  const handleSubmit = async (values) => {
    // store these values in redux
    dispatch(addShippingAddress(values));
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3>Shipping Information</h3>
          <hr />
        </Col>
        {shippingAddress ? (
          <Col>
            <p>
              {shippingAddress.street}, {shippingAddress.city},{" "}
              {shippingAddress.country}
            </p>
            <p>Contact Info : {shippingAddress.phone}</p>
            <p>Extra Notes: {shippingAddress.extraDetails}</p>
          </Col>
        ) : (
          <Col>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              <Form>
                <TextField name='street' type='text' label='Street Address' />
                <TextField name='city' type='text' label='City' />
                <TextField name='country' type='text' label='Country' />
                <TextField name='phone' type='number' label='Phone Number' />
                <TextField
                  name='extraDetails'
                  type='text'
                  label='Please share extra details'
                  as='textarea'
                />
                <Button variant='primary' className='mt-2' type='submit'>
                  Confirm
                </Button>
              </Form>
            </Formik>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ShippingInfo;
