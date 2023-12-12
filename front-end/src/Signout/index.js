import React, { useContext, useEffect } from "react";
import KeycloakContext from "../KeycloakContext";
import CustomNavbar from "../Navbars/CustomNavbar";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signout = () => {
  const keycloak = useContext(KeycloakContext);
  const jwt = keycloak.token;

  useEffect(() => {
    if (keycloak.authenticated) {
      keycloak.logout();
    }
    //window.location.href = "/home";
  }, []);

  return (
    <>
      <div>
        <header
          className="p-5 bg-dark text-light text-center"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container>
            <h1 className="display-4">Arrivederci 🖐️!</h1>
            <p className="lead">Portale di Selezione dell'Università</p>
          </Container>
        </header>

        <Container className="mt-5 d-flex justify-content-center align-items-center">
          <Alert variant="success" style={{ width: "400px" }}>
            <Alert.Heading className="text-center">
              Logout Effettuato con Successo
            </Alert.Heading>
            <p className="text-center">
              Grazie per aver utilizzato il nostro servizio.
            </p>
          </Alert>
        </Container>
        <Container className="mt-5 d-flex justify-content-center align-items-center">
          <Link to="/home">
            <Button variant="dark" className="mt-2 rounded-pill">
              Torna alla Homepage
            </Button>
          </Link>
        </Container>
      </div>
    </>
  );
};

export default Signout;
