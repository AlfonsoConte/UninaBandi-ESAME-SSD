import React, { useContext, useEffect } from "react";
import KeycloakContext from "../KeycloakContext";
import { Navigate } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";

const Signin = () => {
  const keycloak = useContext(KeycloakContext);

  const jwt = keycloak.token;

  useEffect(() => {
    if (!keycloak.authenticated) {
      keycloak.login({ redirectUri: "https://bandiunina.it/home" });
    }
  }, [keycloak]);

  return (
    <div style={{ margin: "2em", marginTop: "5em" }}>
      {" "}
      {!keycloak.authenticated && (
        <h3 className="text-center mt-4">
          Loading....
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </h3>
      )}
      {keycloak.authenticated && (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${process.env.PUBLIC_URL}/federico-background.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <div>
            <h1>Benvenuto!</h1>
            <h2>Sei già stato autenticato con successo. 😊</h2>
            <p>Utilizza pure la Barra in alto per navigare nel sito</p>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Signin;
