import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Badge, Row, Col, Container } from "react-bootstrap";
import apiClient from "../../../services/api-client";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/admin/products`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        setProducts(data);
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
  }, [userInfo]);

  const addProductHandler = () => {
    setLoading(true);
    apiClient
      .post(`/admin/products`, null, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        navigate(`/admin/products/${data.productId}`);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
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
      <Row className='mt-3'>
        <Col md={12} className='mb-2'>
          <Button
            onClick={addProductHandler}
            variant='primary'
            className='float-end'
          >
            <FaPlus />
            &nbsp;Add Product
          </Button>
        </Col>
        <Col md={12}>
          <div className='table-responsive'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th className='text-center'>Category</th>
                  <th className='text-center'>Count In Stock</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.image}
                        height={32}
                        width={32}
                        alt={product.name}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td className='text-center'>{product.category}</td>
                    <td className='text-center'>
                      {product.countInStock > 0 ? (
                        product.countInStock
                      ) : (
                        <Badge bg='danger'>Out of stock</Badge>
                      )}
                    </td>
                    <td className='text-center'>
                      <Button
                        as={NavLink}
                        to={`/admin/products/${product._id}`}
                        className='btn-sm'
                        variant='light'
                      >
                        Edit
                      </Button>
                      <Button
                        as={NavLink}
                        to={`/products/${product._id}`}
                        className='btn-sm'
                        variant='light'
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
