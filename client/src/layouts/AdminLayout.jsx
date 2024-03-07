import { useSelector } from "react-redux";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Container, ListGroup, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AdminLayout = () => {
  const { pathname } = useLocation();

  const paths = [
    { title: "Dashboard", to: "/admin/dashboard" },
    { title: "Products", to: "/admin/products" },
    { title: "Users", to: "/admin/users" },
    { title: "Orders", to: "/admin/orders" },
  ];

  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo && userInfo.isAdmin) {
    return (
      <>
        <Header />
        <Container>
          <ListGroup className='side-menu my-3 me-3 float-start'>
            {paths.map((path) => {
              return (
                <ListGroup.Item
                  key={path.title}
                  as={NavLink}
                  to={path.to}
                  className={`list-group-item-primary ${
                    pathname.includes(path.to) ? "text-light" : "text-dark"
                  }`}
                >
                  {path.title}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <main id='adminLayout' className='mt-3'>
            <Container className='pt-3'>
              <Row>
                <Outlet />
              </Row>
            </Container>
          </main>
        </Container>
        <Footer />
      </>
    );
  }
  return <Navigate to='/auth/login' replace={true} />;
};

export default AdminLayout;
