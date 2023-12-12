import React, { useContext, useEffect, useState } from "react";

import { Card, Col, Row } from "react-bootstrap";

import KeycloakContext from "../../KeycloakContext";

const CallForApplicationApply = () => {
  const keycloak = useContext(KeycloakContext);
  const jwt = keycloak.token;
  const [callForApplications, setCallForApplications] = useState(null);

  useEffect(() => {
    fetch(`api/callForApplications/student/getAll`, {
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
  }, [jwt]);

  return (
    <div
      style={{
        margin: "2em",
        marginTop: "5em",
      }}
    >
      {callForApplications ? (
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
              onClick={() =>
                (window.location.href = `/callForApplications/details/${call.id}`)
              }
            >
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>{call.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Date of Expire: {call.expireDate}
                </Card.Subtitle>
                <Card.Text>{call.description}</Card.Text>
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
        <>NON CI SONO CALL FOR APPLICATIONS</>
      )}
    </div>
  );
};

export default CallForApplicationApply;
