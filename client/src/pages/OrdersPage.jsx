import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import apiClient from "../../services/api-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const OrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/orders`, {
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

  return (
    <div className='mt-3'>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant='danger'>{error}</AlertMessage>
      ) : (
        <div className='table-responsive'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
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
                  <td className='text-center'>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className='text-center'>Rs {order.totalPrice}/-</td>
                  <td className='text-center'>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes className='text-danger' />
                    )}
                  </td>
                  <td className='text-center'>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes className='text-danger' />
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
      )}
    </div>
  );
};

export default OrdersPage;
