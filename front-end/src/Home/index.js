import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import CustomNavbar from "../Navbars/CustomNavbar";

const HomePage = (prop) => {
  const [userType, setUserType] = useState("student"); // stato per la selezione dello studente o supervisore

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const [callForApplications, setCallForApplications] = useState("");

  useEffect(() => {
    fetch(`/api/callForApplications/guest/getLast`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        console.log(data);
        setCallForApplications(data);
      });
  }, []);

  return (
    <div className="mt-4">
      {prop.NavShow && <CustomNavbar />}
      <header
        className="p-5 bg-dark text-light text-center"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <h1 className="display-4">Portale di Selezione dell'Università</h1>
          <p className="lead">
            Benvenuto! Trova e candidati ai bandi di selezione dell'università.
          </p>
          <Row>
            <Col>
              <Button
                variant="primary"
                onClick={() => (window.location.href = "signin")}
              >
                Inizia ora
              </Button>
            </Col>
          </Row>
        </Container>
      </header>
      <h2 className="text-center" style={{ margin: "1em", marginTop: "2em" }}>
        {" "}
        Ultimi Bandi di Selezione
      </h2>
      <Container
        className="my-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${process.env.PUBLIC_URL}/federico-background.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Row className="d-flex justify-content-around">
          {callForApplications &&
            callForApplications.map((call) => (
              <Card
                key={call.id}
                className="mb-3 mt-3"
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  src={process.env.PUBLIC_URL + "/logoUnina.png"}
                />
                <Card.Body className="d-flex flex-column justify-content-around">
                  <Card.Title className="mb-2">{call.title}</Card.Title>
                  <Card.Text>{call.description}</Card.Text>
                  <Card.Footer>Expire: {call.expireDate}</Card.Footer>
                  <Row>
                    <Col
                      className="mt-3 d-flex flex-column gap-4 flex-md-row justify-content-md-between "
                      lg="4"
                      md="7"
                    >
                      <Button
                        variant="primary"
                        onClick={() => (window.location.href = "signin")}
                      >
                        Candidati
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
        </Row>
      </Container>
      );
      <Container className="my-5">
        <h2 className="text-center mb-4">Seleziona il Tipo di Utente</h2>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Group controlId="userTypeSelect">
              <Form.Label>Seleziona il tuo tipo di utente:</Form.Label>
              <Form.Control
                as="select"
                value={userType}
                onChange={handleUserTypeChange}
              >
                <option value="student">Studente</option>
                <option value="supervisor">Supervisore</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      {userType === "student" && (
        <Container className="my-5" id="come-funziona">
          <h2 className="text-center mb-4">Come Funziona: </h2>
          <Row className="text-center">
            <Col>
              <h4>1. Cerca il Bando</h4>
              <p>Trova il bando di selezione che ti interessa.</p>
            </Col>
            <Col>
              <h4>2. Compila la Domanda</h4>
              <p>Compila il modulo di domanda online.</p>
            </Col>
            <Col>
              <h4>3. Invia la Candidatura</h4>
              <p>Invia la tua candidatura e monitora lo stato.</p>
            </Col>
          </Row>
        </Container>
      )}
      {userType === "supervisor" && (
        <Container className="my-5">
          <h2 className="text-center mb-4">Come Funziona: </h2>
          <Row className="text-center">
            <Col>
              <h4>1. Modifica i Bandi di selezione</h4>
              <p>Crea/Elimina/Modifica o Cerca il bando di selezione.</p>
            </Col>
            <Col>
              <h4>2. Revisiona le application</h4>
              <p>Revisiona ciascuna delle application.</p>
            </Col>
            <Col>
              <h4>3. Accetta o Rifiuta le application</h4>
              <p>Trasmetti l'esito della revisione agli studenti</p>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default HomePage;
