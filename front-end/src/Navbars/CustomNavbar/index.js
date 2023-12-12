import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import KeycloakContext from "../../KeycloakContext";
import { Link } from "react-scroll";
import "../style.css";
const CustomNavbar = () => {
  const keycloak = useContext(KeycloakContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>Università Federico II</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/home" className="mx-2">
              Home
            </Nav.Link>

            <Link to="come-funziona" smooth={true} duration={500}>
              <Nav.Link
                className="mx-2"
                style={{
                  whiteSpace: "nowrap",

                  textOverflow: "ellipsis",
                }}
              >
                Come Funziona
              </Nav.Link>
            </Link>
            <Nav.Link
              style={{
                whiteSpace: "nowrap",

                textOverflow: "ellipsis",
              }}
              href="/contacts"
              className="mx-2"
            >
              Contatti
            </Nav.Link>

            {!keycloak.authenticated && (
              <div className="navstyle">
                <Button
                  variant="outline-light"
                  className="mx-4 "
                  onClick={() => (window.location.href = "/signin")}
                >
                  Login
                </Button>
                <Button
                  variant="outline-light"
                  className="mx-2"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Register
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
