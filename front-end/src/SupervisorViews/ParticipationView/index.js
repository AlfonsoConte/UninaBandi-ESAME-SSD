import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import KeycloakContext from "../../KeycloakContext";

const ParticipationView = () => {
  const [participations, setParticipations] = useState("");
  const id = window.location.href.split("/")[4];
  const keycloak = useContext(KeycloakContext);
  const jwt = keycloak.token;

  useEffect(() => {
    fetch(`/api/callForApplications/supervisor/${id}/participations`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((part) => {
        setParticipations(part);
      });
  }, []);

  const updateParticipation = (partId) => {
    fetch(`/api/participations/supervisor/update/${partId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response;
      })
      .then((part) => {
        console.log(part);
      });
  };

  return (
    <div style={{ margin: "2em", marginTop: "5em" }}>
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
                <Card.Text>
                  Review State:{" "}
                  {part.review === "To Be Reviewed" && (
                    <Badge
                      pill
                      bg="primary"
                      style={{ fontSize: "0.8em", marginLeft: "0.5rem" }}
                    >
                      {part.review}
                    </Badge>
                  )}
                  {part.review === "In Review" && (
                    <Badge
                      pill
                      bg="warning"
                      style={{ fontSize: "0.8em", marginLeft: "0.5rem" }}
                    >
                      {part.review}
                    </Badge>
                  )}
                  {part.review === "Reviewed" && (
                    <Badge
                      pill
                      bg="success"
                      style={{ fontSize: "0.8em", marginLeft: "0.5rem" }}
                    >
                      {part.review}
                    </Badge>
                  )}
                </Card.Text>
                <Card.Text className="d-flex flex-row">
                  Status:
                  <div
                    style={{
                      fontStyle: "italic",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {part.status}
                  </div>
                </Card.Text>

                <Row className="justify-content-center">
                  <Col
                    className="mt-3 d-flex flex-column gap-4 flex-md-row justify-content-md-between "
                    lg="4"
                    md="7"
                  >
                    <Button
                      variant="dark"
                      id="submit"
                      type="button"
                      onClick={() => {
                        updateParticipation(part.id);
                        window.location.href = `/participations/review/${part.id}`;
                      }}
                    >
                      Review
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <Container className="mt-5 d-flex justify-content-center align-items-center">
          <Alert
            variant="dark"
            className="custom-alert"
            style={{ width: "400px" }}
          >
            <Alert.Heading className="text-center">
              Non ci sono ancora participations per il Bando selezionato
            </Alert.Heading>
          </Alert>
        </Container>
      )}
    </div>
  );
};

export default ParticipationView;
