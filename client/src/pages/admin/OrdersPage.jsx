import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Badge, Row, Col, Container } from "react-bootstrap";
import apiClient from "../../../services/api-client";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const OrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/admin/orders`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        setOrders(data);
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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <AlertMessage variant='danger'>{error}</AlertMessage>;
  }
  return (
    <Container>
      <Row className='mt-3'>
        <Col md={12}>
          <div className='table-responsive'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Name</th>
                  <th className='text-center'>Date</th>
                  <th className='text-center'>Total</th>
                  <th className='text-center'>Paid</th>
                  <th className='text-center'>Delivered</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td className='text-center'>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className='text-center'>Rs {order.totalPrice}/-</td>
                    <td className='text-center'>
                      {order.isPaid ? (
                        <>
                          <Badge bg='success'>Paid</Badge>
                          &nbsp;
                          {order.paidAt.substring(0, 10)}
                        </>
                      ) : (
                        <FaTimes className='text-danger' />
                      )}
                    </td>
                    <td className='text-center'>
                      {order.isDelivered ? (
                        <>
                          <Badge bg='success'>Delivered</Badge>
                          order.deliveredAt.substring(0, 10)
                        </>
                      ) : (
                        <Button variant='warning'>Deliver Now</Button>
                      )}
                    </td>
                    <td className='text-center'>
                      <Button
                        as={NavLink}
                        to={`/orders/${order._id}`}
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

export default OrdersPage;
