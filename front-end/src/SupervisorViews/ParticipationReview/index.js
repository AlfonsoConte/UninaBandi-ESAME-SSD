import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import KeycloakContext from "../../KeycloakContext";

const ParticipationReview = () => {
  const id = window.location.href.split("participations/review/")[1];

  const [student, setStudent] = useState("");
  const keycloak = useContext(KeycloakContext);
  const jwt = keycloak.token;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/participations/supervisor/review/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        console.log(data);
        setStudent(data);
      });
  }, []);

  const Approve = (id) => {
    fetch(`/api/participations/supervisor/approve`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify(id),
    })
      .then((response) => {
        if (response.status === 200) return response;
      })
      .then((part) => {
        console.log(part);
      })
      .then(() => {
        navigate(-1);
      });
  };

  const Decline = (id) => {
    fetch(`/api/participations/supervisor/decline`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify(id),
    })
      .then((response) => {
        if (response.status === 200) return response;
      })
      .then((part) => {
        console.log(part);
        navigate(-1);
      });
  };

  return (
    <div style={{ margin: "2em", marginTop: "5em" }}>
      <h3 className="text-center mb-4">
        <Badge bg="secondary">Partcipation ID: {id}</Badge>
      </h3>
      <Card className="text-center">
        <Card.Header>
          Name: <b>{student.name} </b> Surname: <b>{student.surname}</b>
        </Card.Header>
        <Card.Body>
          <Card.Title>Matricola: {student.matricola}</Card.Title>
          <Card.Text> Student Contact:</Card.Text>
          <Row className="justify-content-center">
            <Col md="7" lg="4" className="d-flex flex-column gap-4">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th> Matricola</th>
                    <th> Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{student.matricola}</td>
                    <td>{student.email}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col
              className="mt-3 d-flex flex-column gap-4 flex-md-row justify-content-md-between"
              lg="4"
              md="7"
            >
              <Button
                variant="success"
                id="submit"
                type="button"
                onClick={() => Approve(id)}
              >
                Approve
              </Button>

              <Button
                variant="danger"
                id="submit"
                type="button"
                onClick={() => Decline(id)}
              >
                Decline
              </Button>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </div>
  );
};

export default ParticipationReview;
