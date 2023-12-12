import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import KeycloakContext from "../../KeycloakContext";
const CustomNavbarStudent = () => {
  const keycloak = useContext(KeycloakContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>Università Federico II</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ">
            <Nav.Link
              href="/home"
              className="mx-2 ml-2"
              style={{
                whiteSpace: "nowrap",

                textOverflow: "ellipsis",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/callForApplications"
              className="mx-2"
              style={{
                whiteSpace: "nowrap",

                textOverflow: "ellipsis",
              }}
            >
              Call For Application
            </Nav.Link>
            <Nav.Link
              href="/myparticipations"
              className="mx-2 ml-2"
              style={{
                whiteSpace: "nowrap",

                textOverflow: "ellipsis",
              }}
            >
              My Participations
            </Nav.Link>

            <Nav.Link className="mx-2" href="contacts">
              Contatti
            </Nav.Link>
            <div style={{ marginLeft: "35rem" }}>
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

export default CustomNavbarStudent;
