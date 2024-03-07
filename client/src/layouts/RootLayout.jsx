import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
const RootLayout = () => {
  return (
    <>
      <Header />
      <main id='rootLayout'>
        <Container className='py-2'>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
