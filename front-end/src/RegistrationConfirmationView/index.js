import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

const RegistrationConfirmationView = () => {
  return (
    <Container className="my-5  align-items-center" style={{ height: "100vh" }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={8}>
          <div
            className="text-center p-4 rounded"
            style={{
              background: ` #212529`,
            }}
          >
            <FaCheckCircle
              style={{
                fontSize: "3rem",
                color: "#4caf50",
                marginBottom: "1rem",
              }}
            />
            <h2 className="text-light mb-4">
              🎉 Registrazione completata con successo 🥳!
            </h2>
          </div>
          <div className="bg-white p-4 rounded">
            <p className="text-center mt-2">
              La tua registrazione è andata a buon fine. Una notifica via mail
              ti avviserà quando il tuo account sarà attivato dai nostri
              amministratori.
            </p>
            <hr />
            <p className="text-center mb-0">
              I nostri operatori sono a lavoro per te 🛠️.
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/home")}
              className="mt-4"
            >
              Torna alla Home
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationConfirmationView;
