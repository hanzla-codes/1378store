import { Button, Card, Spinner } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import apiClient from "../../../services/api-client";
import TextField from "../../components/TextField";
import { addUserInfo } from "../../redux/authSlice";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password should be 3 charactors long")
      .matches(/[a-z]/, "Password must have a lower case charactor")
      .matches(/[A-Z]/, "Password must have a upper case charactor")
      .matches(/[0-9]/, "Password must have a numaric charactor"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    setLoading(true);
    apiClient
      .post("/auth/register", values)
      .then(({ data }) => {
        dispath(addUserInfo(data));
        toast.success(`Welcome ${data.name}!`);
        navigate("/");
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

  return (
    <>
      <Card.Header>
        <Card.Title className='text-center'>Register</Card.Title>
      </Card.Header>
      <Card.Body>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form>
            <TextField name='name' label='Name' type='text' />
            <TextField name='email' label='Email' type='email' />
            <TextField name='password' label='Password' type='password' />
            <Button
              variant='primary'
              className='mt-2'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Formik>
      </Card.Body>
      <Card.Footer>
        Already have an account? <Link to='/auth/login'>Login Now</Link>
      </Card.Footer>
    </>
  );
};

export default Register;
