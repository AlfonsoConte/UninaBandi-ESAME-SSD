import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import KeycloakContext from "../../KeycloakContext";

const UserDetailsView = () => {
  const id = window.location.href.split("users/user/details/")[1];
  const [user, setUser] = useState("");
  const keycloak = useContext(KeycloakContext);
  const jwt = keycloak.token;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/admin/user/details/${id}`, {
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
        setUser(data);
      });
  }, []);

  function deleteFromDb() {
    let role;
    if (user.student) {
      role = "student";
    } else {
      role = "supervisor";
    }
    fetch(`/admin/user/${role}/delete/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) return response.text;
      })
      .then((data) => {
        console.log(data);
      });
  }

  const deleteUser = () => {
    deleteFromDb();
    deleteFromKeycloak();
  };

  const deleteFromKeycloak = () => {
    fetch(`/admin/user/keycloak/delete/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) return response.text;
      })
      .then((data) => {
        console.log(data);
        navigate(-1);
      });
  };

  return (
    <div style={{ margin: "2em", marginTop: "5em" }}>
      {user.student && (
        <Card className="text-center">
          <Card.Header>
            Name: <b>{user.student.name}</b> Surname:{" "}
            <b>{user.student.surname}</b>
          </Card.Header>
          <Card.Body>
            <Card.Title>Matricola: {user.student.matricola}</Card.Title>
            <Card.Text> Student Contact:</Card.Text>
            <Row className="justify-content-center">
              <Col md="7" lg="4" className="d-flex flex-column gap-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th> Email</th>
                      <th> Telefono</th>
                      <th> BirthDay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{user.student.email}</td>
                      <td>{user.student.tel}</td>
                      <td>{user.student.birthDay}</td>
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
                  variant="secondary"
                  id="submit"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>

                <Button
                  variant="danger"
                  id="submit"
                  type="button"
                  onClick={() => deleteUser()}
                >
                  Delete User
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {user.supervisor && (
        <Card className="text-center">
          <Card.Header>
            Name: <b>{user.supervisor.name}</b> Surname:{" "}
            <b>{user.supervisor.surname}</b>
          </Card.Header>
          <Card.Body>
            <Card.Title>Badge Number: {user.supervisor.badgeNumber}</Card.Title>
            <Card.Text> Supervisor Contact:</Card.Text>
            <Row className="justify-content-center">
              <Col md="7" lg="4" className="d-flex flex-column gap-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th> Email</th>
                      <th> Telefono</th>
                      <th> BirthDay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{user.supervisor.email}</td>
                      <td>{user.supervisor.tel}</td>
                      <td>{user.supervisor.birthDay}</td>
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
                  variant="secondary"
                  id="submit"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>

                <Button
                  variant="danger"
                  id="submit"
                  type="button"
                  onClick={() => deleteUser()}
                >
                  Delete User
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default UserDetailsView;
