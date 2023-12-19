// ContactPage.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomNavbar from "../Navbars/CustomNavbar";

const ContactView = (prop) => {
  return (
    <div>
      {prop.NavShow && <CustomNavbar />}

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.83), rgba(0, 0, 0, 0.83)),url(${process.env.PUBLIC_URL}/federico-background.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff",
          textAlign: "center",
          padding: "50px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "3em" }}>Informazioni di Contatto</h1>
          <Row className="mt-5">
            <Col md={6}>
              <h2 style={{ color: "#FFFFFF" }}>Assistenza Clienti:</h2>
              <p>
                Hai domande o hai bisogno di assistenza? Il nostro team di
                assistenza clienti è qui per aiutarti.
              </p>
              <div style={{ "text-align": "left", "margin-left": "8rem" }}>
                <p>
                  Email:{" "}
                  <strong style={{ color: "#FFD700" }}>
                    alfon.conte@studenti.unina.it
                  </strong>
                </p>
                <p>
                  Email:{" "}
                  <strong style={{ color: "#FFD700" }}>
                    d.fazzari@unina.it
                  </strong>
                </p>
                <p>
                  Email:{" "}
                  <strong style={{ color: "#FFD700" }}>
                    v.deiasio@unina.it
                  </strong>
                </p>
              </div>
            </Col>
            <Col md={6}>
              <h2 style={{ color: "#FFFFFF" }}>Numeri di Telefono:</h2>
              <p>Puoi contattarci telefonicamente ai seguenti numeri:</p>
              <p>
                Supporto Clienti:{" "}
                <strong style={{ color: "#FFD700" }}>+123 456 7890</strong>
              </p>
              <p>
                Assistenza Tecnica:{" "}
                <strong style={{ color: "#FFD700" }}>+987 654 3210</strong>
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h2 style={{ color: "#FFFFFF" }}>Orari di Contatto:</h2>
              <p>
                I nostri operatori sono disponibili dal lunedì al venerdì, dalle
                <strong style={{ color: "#FFD700" }}> 9:00</strong> alle{" "}
                <strong style={{ color: "#FFD700" }}>17:00</strong>.
              </p>
            </Col>
          </Row>
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/home")}
            className="mt-4"
          >
            Torna alla Home
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ContactView;
