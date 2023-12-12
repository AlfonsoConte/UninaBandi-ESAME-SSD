import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import KeycloakContext from "../../KeycloakContext";
import { Link } from "react-router-dom";

const UsersView = () => {
  const [users, setUsers] = useState("");
  const keycloak = useContext(KeycloakContext);
  const jwt = keycloak.token;

  const EnableDisable = (checked, username) => {
    fetch(`/admin/user/EnableDisable`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify({ enable: checked, user: username }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetch(`/admin/user/users`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((users) => {
        setUsers(users);
        console.log(users);
      });
  }, []);

  return (
    <Card body className="h-100" style={{ margin: "2em", marginTop: "5em" }}>
      <Row className="justify-content-center fs-2 gap-3 mb-4">
        List Of Users
      </Row>
      <Container>
        <Row className="justify-content-between">
          <Col className="fs-4 text-center">Users</Col>
          <Col className="fs-4 text-center">Informations</Col>
          <Col className="fs-4 text-center">Enable/Disable</Col>
        </Row>
        {users ? (
          <div className="d-grid gap-5">
            {users.map((user) => (
              <div key={user.id}>
                <Stack className="h-100 bg-light border">
                  <Row>
                    <Col>
                      {" "}
                      <div className=" mt-2 mb-1 text-center">
                        {" "}
                        {/*bg-light border*/}
                        {user.username}
                      </div>
                    </Col>
                    <Col>
                      {" "}
                      <div className="  mt-2 mb-1 text-center">
                        <Link to={`user/details/${user.id}`}>
                          {user.firstName} {user.lastName}
                        </Link>
                      </div>
                    </Col>

                    <Col className="mt-2 mb-1 gap-4 text-center" lg="4" md="7">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        onChange={(e) => {
                          EnableDisable(e.target.checked, user.username);
                        }}
                        defaultChecked={user.enabled}
                      />
                    </Col>
                  </Row>
                </Stack>
              </div>
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
                Non ci sono ancora Utenti registrati all'applicazione.
              </Alert.Heading>
            </Alert>
          </Container>
        )}
      </Container>
    </Card>
  );
};

export default UsersView;
