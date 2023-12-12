import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";

import jwt_decode from "jwt-decode";
import KeycloakContext from "../../KeycloakContext";

const CallForApplicationDetails = () => {
  const [callForApplication, setCallForApplication] = useState("");
  const keycloak = useContext(KeycloakContext);
  const jwt = keycloak.token;
  const [check, setCheck] = useState(false);

  const id = window.location.href.split("/callForApplications/details/")[1];

  const Apply = () => {
    fetch(`/api/participations/student/apply/${id}`, {
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
        window.location.reload(true);
      });
  };

  useEffect(() => {
    fetch(`/api/callForApplications/student/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((callData) => {
        setCallForApplication(callData);
        console.log(callData);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/student/checkCall/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        if (response.status === 400) alert("Token Invalid");
      })
      .then((check) => {
        console.log("Valore di check", check);
        setCheck(check);
      });
  }, []);

  return (
    <div
      style={{
        margin: "2em",
        marginTop: "5em",
      }}
    >
      <Card className="text-center">
        <Card.Header>Call For Application ID: {id}</Card.Header>
        <Card.Body>
          <Card.Title>{callForApplication.title}</Card.Title>
          <Card.Text> {callForApplication.description}</Card.Text>
          <Card.Link href={callForApplication.docUrl} target="_blank">
            Documentation
          </Card.Link>{" "}
          {check === false && (
            <Row className="justify-content-center">
              <Col className="mt-3 gap-4" lg="4" md="7">
                <Button
                  variant="success"
                  id="submit"
                  type="button"
                  onClick={() => Apply()}
                >
                  Apply
                </Button>
              </Col>
            </Row>
          )}
          {check === true && (
            <Row className="justify-content-center">
              <Col className="mt-3 gap-4" lg="4" md="7">
                <Button variant="secondary" id="submit" type="button" disabled>
                  Applied
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          Expire Date: {callForApplication.expireDate}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CallForApplicationDetails;
