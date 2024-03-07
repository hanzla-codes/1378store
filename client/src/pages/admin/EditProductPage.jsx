import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../services/api-client";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import TextField from "../../components/TextField";
import CheckField from "../../components/CheckField";
import axios from "axios";

const EditProductPage = () => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name is atleast 3 charactor long"),
    price: yup.number().required("Price is required"),
    description: yup
      .string()
      .max(1000, "Description can't exced from 1000 charactors"),
    category: yup.string().max(50, "Category can't exced from 1000 charactors"),
    fabric: yup.string().max(50, "Fabric can't exced from 1000 charactors"),
    color: yup.string().max(50, "Fabric can't exced from 1000 charactors"),
    image: yup.string(),
    countInStock: yup.number(),
    isActive: yup.bool().required(),
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    apiClient
      .get(`/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
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
  }, [id, userInfo]);

  const onSubmit = (values) => {
    setLoading(true);
    apiClient
      .put(`/admin/products/${id}`, values, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        toast.success(`Product updated`);
        setProduct(data);
        //  navigate("/admin/products");
      })
      .catch((err) => {
        let message =
          err.response.data && err.response.data.message
            ? err.response.data.message
            : err.message;
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onImageChange = (e) => {
    const [file] = e.target.files;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "evslahore");
    const cloudName = "theimage";
    setLoading(true);
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
      .then(({ data }) => {
        setProduct({ ...product, image: data.secure_url });
        toast.success("Image uploaded. Please save your changings.");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <AlertMessage variant='danger'>{error}</AlertMessage>;
  }
  return (
    <Container>
      {product && (
        <Row className='my-3 justify-content-center'>
          <Col md={6} sm={12}>
            <Formik
              onSubmit={onSubmit}
              initialValues={product}
              validationSchema={validationSchema}
            >
              <Form>
                <TextField name='name' label='Name' type='text' />
                <TextField name='price' label='Price' type='number' />
                <TextField
                  name='description'
                  label='Description'
                  type='text'
                  as='textarea'
                />
                <TextField name='category' label='Category' type='text' />
                <TextField name='fabric' label='Fabric' type='text' />
                <TextField name='color' label='Color' type='text' />
                <TextField name='image' label='Image' type='text' />
                <FormGroup>
                  <FormControl
                    name='upload'
                    onChange={onImageChange}
                    type='file'
                  ></FormControl>
                </FormGroup>
                <TextField
                  name='countInStock'
                  label='Count In Stock'
                  type='number'
                />
                <CheckField
                  name='isActive'
                  label='Product is active'
                  type='checkbox'
                />
                <Button
                  variant='primary'
                  className='mt-2'
                  type='submit'
                  disabled={loading}
                >
                  Update
                </Button>
              </Form>
            </Formik>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default EditProductPage;
