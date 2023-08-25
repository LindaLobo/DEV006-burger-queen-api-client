import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";



const Navigation = () => {

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  // console.log(auth)

  const logout = () => {
    setAuth({
      token: "",
      auth: false
    });
    sessionStorage.setItem('token', '');
    navigate("/")
  }


  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <Container className="container" style={{ margin: 0 }} >
          <Col xs={6} md={4}>
            <Image
              style={{ width: 180, height: 180 }}
              src={logo}
              roundedCircle
            />
          </Col>
          <Navbar.Brand style={{ width: 340, height: 50 }} href="/">
            {" "}
            <h1 className="titulo" >BURGER QUEEN 👑</h1>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {auth.auth ? (
              <button onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
              ) : null }
              </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
};

export default Navigation;
