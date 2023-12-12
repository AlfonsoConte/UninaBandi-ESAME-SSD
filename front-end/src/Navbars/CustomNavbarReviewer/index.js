import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import KeycloakContext from "../../KeycloakContext";
const CustomNavbarReviewer = () => {
  const keycloak = useContext(KeycloakContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>Università Federico II</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              style={{
                whiteSpace: "nowrap",

                textOverflow: "ellipsis",
              }}
              href="/home"
              className="mx-2"
            >
              Home
            </Nav.Link>
            <Nav.Link
              style={{
                whiteSpace: "nowrap",

                textOverflow: "ellipsis",
              }}
              href="/dashboard"
              className="mx-2"
            >
              Call For Application
            </Nav.Link>

            <Nav.Link className="mx-2" href="contacts">
              Contatti
            </Nav.Link>
            <div style={{ marginLeft: "45rem" }}>
              {!keycloak.authenticated && (
                <>
                  <Button
                    variant="outline-light"
                    className="mx-4"
                    onClick={() => (window.location.href = "/signin")}
                  >
                    Login
                  </Button>
                </>
              )}

              {keycloak.authenticated && (
                <>
                  <Button
                    variant="outline-light"
                    className="mx-4"
                    onClick={() => (window.location.href = "/signout")}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbarReviewer;
