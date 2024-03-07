import { Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <main
      id='authLayout'
      className='d-flex justify-content-center align-items-center bg-primary'
    >
      <Card style={{ width: "400px" }}>
        <Outlet />
      </Card>
    </main>
  );
};

export default AuthLayout;
