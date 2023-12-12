import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import KeycloakContext from "../../KeycloakContext";

const Participations = (prop) => {
  const keycloak = useContext(KeycloakContext);
  const jwt = keycloak.token;
  const [participations, setParticipations] = useState("");

  useEffect(() => {
    fetch(`api/participations/student/get`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((participationsData) => {
        setParticipations(participationsData);
        console.log(participationsData);
      });
  }, []);

  return (
    <div
      style={{
        margin: "2em",
        marginTop: "5em",
      }}
    >
      {participations.length !== 0 ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill,18rem)" }}
        >
          {participations.map((part) => (
            <Card
              key={part.id}
              style={{
                width: "18rem",
                cursor: "pointer",
              }}
            >
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Participation number: {part.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Issued Date: {part.issuedDate}
                </Card.Subtitle>
                <Card.Text className="d-flex flex-row">
                  Review Status:{" "}
                  <div
                    style={{
                      fontStyle: "italic",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {part.review}
                  </div>
                </Card.Text>
                {part.status === "Approved" && (
                  <Card.Text>
                    {" "}
                    Status:
                    <Badge
                      pill
                      bg="success"
                      style={{ fontSize: "0.9em", marginLeft: "0.5rem" }}
                    >
                      {part.status}
                    </Badge>
                  </Card.Text>
                )}

                {part.status === "Declined" && (
                  <Card.Text>
                    {" "}
                    Status:
                    <Badge
                      pill
                      bg="danger"
                      style={{ fontSize: "0.9em", marginLeft: "0.5rem" }}
                    >
                      {part.status}
                    </Badge>
                  </Card.Text>
                )}

                {part.status === "Applied" && (
                  <Card.Text>
                    {" "}
                    Status:
                    <Badge
                      pill
                      bg="primary"
                      style={{ fontSize: "0.9em", marginLeft: "0.5rem" }}
                    >
                      {part.status}
                    </Badge>
                  </Card.Text>
                )}

                <Card.Text>
                  Applied for:{" "}
                  <Card.Link
                    href={`/callForApplications/details/${part.call.id}`}
                  >
                    {part.call.title}{" "}
                  </Card.Link>
                </Card.Text>

                <Row className="justify-content-center">
                  <Col
                    className="mt-3 d-flex flex-column gap-4 flex-md-row justify-content-md-between "
                    lg="4"
                    md="7"
                  ></Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <Container className="mt-5 d-flex justify-content-center align-items-center">
          <Alert
            variant="warning"
            className="custom-alert"
            style={{ width: "400px" }}
          >
            <Alert.Heading className="text-center">
              Non Hai ancora partecipato a nessun Bando di concorso
            </Alert.Heading>
            <p className="text-center">
              Vai Nella sezione dedicata per sottomettere la tua prima
              Application!
            </p>
          </Alert>
        </Container>
      )}
    </div>
  );
};

export default Participations;
