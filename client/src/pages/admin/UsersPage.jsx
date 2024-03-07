import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Badge, Row, Col, Container } from "react-bootstrap";
import apiClient from "../../../services/api-client";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import { NavLink } from "react-router-dom";

const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
                  <th>Name</th>
                  <th>Email</th>
                  <th className='text-center'>Role</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className='text-center'>
                      {user.isAdmin ? (
                        <Badge bg='success'>Admin</Badge>
                      ) : (
                        <Badge bg='secondary'>Customer</Badge>
                      )}
                    </td>
                    <td className='text-center'>
                      <Button
                        as={NavLink}
                        to={`/admin/users/${user._id}`}
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

export default UsersPage;
