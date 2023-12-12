import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import KeycloakContext from "../../KeycloakContext";

const CallForApplicationView = () => {
  const [callForApplication, setCallForApplication] = useState({
    id: "",
    title: "",
    docUrl: "",
    description: "",
    expireDate: "",
  });
  const keycloak = useContext(KeycloakContext);
  const jwt = keycloak.token;

  const id = window.location.href.split("/callForApplications/edit/")[1];
  const navigate = useNavigate();

  //Vogliamo sincronizzarci con il bando server side
  function updateCall(prop, value) {
    const newCall = { ...callForApplication };
    newCall[prop] = value;
    setCallForApplication(newCall);
  }

  function saveCall() {
    fetch(`/api/callForApplications/supervisor/editcall/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify(callForApplication),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((callForApplicationData) => {
        setCallForApplication(callForApplicationData);
        navigate(-1);
      });
  }

  useEffect(() => {
    fetch(`/api/callForApplications/supervisor/${id}`, {
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
        //if (callData.docUrl === null) callData.docUrl = "";
        setCallForApplication(callData);
      });
  }, []);

  return (
    <div style={{ margin: "2em", marginTop: "5em" }}>
      <Container>
        <Row className="justify-content-center">
          <Col
            md="7"
            lg="4"
            className="d-flex flex-column gap-5"
            style={{ marginTop: "25px" }}
          >
            <h1 style={{ textAlign: "center" }}>CallForApplication {id}</h1>
          </Col>
        </Row>
      </Container>

      {callForApplication ? (
        <Container style={{ marginTop: "25px" }}>
          <Row className="justify-content-center">
            <Col md="7" lg="4" className="d-flex flex-column gap-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fs-4">Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => updateCall("title", e.target.value)}
                  value={callForApplication.title}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md="7" lg="4" className="d-flex flex-column gap-4">
              <Form.Group className="mb-3" controlId="ExpireDate">
                <Form.Label className="fs-4">Expire Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => updateCall("expireDate", e.target.value)}
                  value={callForApplication.expireDate}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md="7" lg="4" className="d-flex flex-column gap-4">
              <Form.Group className="mb-3" controlId="DocUrl">
                <Form.Label className="fs-4">Doc Url</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => updateCall("docUrl", e.target.value)}
                  value={callForApplication.docUrl}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md="7" lg="4" className="d-flex flex-column gap-4">
              <Form.Group className="mb-3" controlId="Description">
                <Form.Label className="fs-4">Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={3}
                  onChange={(e) => updateCall("description", e.target.value)}
                  value={callForApplication.description}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col
              className="mt-3 d-flex flex-column gap-4 flex-md-row justify-content-md-between"
              lg="4"
              md="7"
            >
              <Button
                style={{ marginLeft: "100px" }}
                variant="primary"
                id="submit"
                type="button"
                onClick={() => saveCall()}
              >
                Submit Call For Application
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CallForApplicationView;
