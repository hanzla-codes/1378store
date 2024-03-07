import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeUserInfo } from "../redux/authSlice";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(removeUserInfo());
    toast.success("Logout successfully");
    navigate("/auth/login");
  };
  return (
    <Navbar expand='lg' className='bg-primary' variant='dark'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          1378Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link to='/cart' as={NavLink}>
              <FaCartShopping />
              Cart
              {cartItems.length > 0 && (
                <Badge bg='secondary' className='ms-1'>
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='nav-dropdown'>
                <NavDropdown.Item as={NavLink} to='/profile'>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/orders'>
                  Orders
                </NavDropdown.Item>
                {userInfo.isAdmin && (
                  <NavDropdown.Item as={NavLink} to='/admin/dashboard'>
                    Dashboard
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link to='/auth/login' as={NavLink}>
                <FaUser />
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
