import React, { useContext, useEffect, useState } from "react";

import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import KeycloakContext from "../../KeycloakContext";

import { Link } from "react-router-dom";

const Dashboard = () => {
  const keycloak = useContext(KeycloakContext);
  const jwt = keycloak.token;
  const [callForApplications, setCallForApplications] = useState("");

  useEffect(() => {
    console.log("Sono in dashboard e stampo il jwt", jwt);
    fetch(`api/callForApplications/supervisor/calls`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((calls) => {
        setCallForApplications(calls);
        console.log(calls);
      });
  }, []);

  function createCallForApplication() {
    fetch("/api/callForApplications/supervisor/create", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((call) => {
        console.log(call);
        window.location.href = `/callForApplications/edit/${call.id}`;
      });
  }

  function deleteCallForApplication(id) {
    fetch("/api/callForApplications/supervisor", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "DELETE",
      body: id,
    })
      .then((response) => {
        if (response.status === 200) return response;
      })
      .then((data) => {
        return data.text();
      })
      .then((b) => {
        console.log(b, id);
        window.location.reload(true);
      });
  }

  return (
    <div style={{ margin: "2em", marginTop: "5em" }}>
      {console.log(callForApplications)}
      {callForApplications.length !== 0 ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill,18rem)" }}
        >
          {callForApplications.map((call) => (
            <Card
              key={call.id}
              style={{
                width: "18rem",
                cursor: "pointer",
              }}
            >
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>
                  {
                    <Link to={`/callForApplications/${call.id}/participations`}>
                      {call.title}
                    </Link>
                  }
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Date of Expire: {call.expireDate}
                </Card.Subtitle>
                <Card.Text>{call.description}</Card.Text>
                <Row>
                  <Col
                    className="mt-3 d-flex flex-column gap-4 flex-md-row justify-content-md-between "
                    lg="4"
                    md="7"
                  >
                    <Button
                      onClick={() => {
                        window.location.href = `/callForApplications/edit/${call.id}`;
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      id="submit"
                      type="button"
                      onClick={() => deleteCallForApplication(call.id)}
                    >
                      Delete
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
            variant="warning"
            className="custom-alert"
            style={{ width: "400px" }}
          >
            <Alert.Heading className="text-center">
              Non ci sono ancora Bandi di concorso.
            </Alert.Heading>
            <p className="text-center">
              Crea e pubblica un nuovo bando per cominciare!
            </p>
          </Alert>
        </Container>
      )}
      <div className="mt-5 mt-5 d-flex justify-content-center align-items-center">
        <Button onClick={() => createCallForApplication()}>
          Create New CallForApplication
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
