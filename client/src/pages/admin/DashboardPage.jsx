import { Card, Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import apiClient from "../../../services/api-client";

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/admin/users`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        setUsers(data);
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
  
  return (
    <>
      <Container fluid className='pt-3'>
        <Row>
          <Col md={4}>
            <Card className='bg-light'>
              <Card.Body as={NavLink} to='/admin/products'>
                <Card.Title>Products</Card.Title>
                <Card.Text className='text-center display-4'>{products.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='bg-light'>
              <Card.Body as={NavLink} to='/admin/orders'>
                <Card.Title>Orders</Card.Title>
                <Card.Text className='text-center display-4'>{orders.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='bg-light'>
              <Card.Body as={NavLink} to='/admin/users'>
                <Card.Title>Users</Card.Title>
                <Card.Text className='text-center display-4'>{users.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardPage;
