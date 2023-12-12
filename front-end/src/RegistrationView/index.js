import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Dropdown,
  DropdownButton,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const RegistrationView = () => {
  const [errConfPass, setErrConfPass] = useState({
    insert: false,
    match: false,
  });
  const [confirmPassw, setConfirmPassw] = useState("");
  const [registrationFail, setRegistrationFail] = useState(true);
  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
  const [alertMsg, setAlertMsg] = useState(
    " Controlla che tutte le informazioni inserite siano corrette!"
  );

  const [errorMessage, setErrorMessage] = useState({
    minLength: false,
    minUppercase: false,
    minNumbers: false,
    minSymbols: false,
    minLowercase: false,
  });

  const captchaRef = useRef(null);

  const validate = (e) => {
    if (e.target.value.length >= 8) {
      setErrorMessage((prevstate) => ({ ...prevstate, minLength: false }));
    } else {
      setErrorMessage((prevstate) => ({ ...prevstate, minLength: true }));
    }
    if (/.*[A-Z]/.test(e.target.value)) {
      setErrorMessage((prevstate) => ({ ...prevstate, minUppercase: false }));
    } else {
      setErrorMessage((prevstate) => ({ ...prevstate, minUppercase: true }));
    }
    if (/.*[!@#$&*]/.test(e.target.value)) {
      setErrorMessage((prevstate) => ({ ...prevstate, minSymbols: false }));
    } else {
      setErrorMessage((prevstate) => ({ ...prevstate, minSymbols: true }));
    }
    if (/.*[0-9]/.test(e.target.value)) {
      setErrorMessage((prevstate) => ({ ...prevstate, minNumbers: false }));
    } else {
      setErrorMessage((prevstate) => ({ ...prevstate, minNumbers: true }));
    }
    if (/.*[a-z].*[a-z].*[a-z]/.test(e.target.value)) {
      setErrorMessage((prevstate) => ({ ...prevstate, minLowercase: false }));
    } else {
      setErrorMessage((prevstate) => ({ ...prevstate, minLowercase: true }));
    }
  };

  const [user, setUser] = useState({
    userName: "",
    matricola: "",
    name: "",
    surname: "",
    email: "",
    tel: "",
    birthDay: "",
    password: "",
    badgeNumber: "",
    role: "Select Role",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const checkEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.email || user.email.length === 0 || !regex.test(user.email)) {
      return false;
    } else return true;
  };

  const checkMatricola = () => {
    const regex = /^[A-Z][0-9]{8}$/;

    if (!regex.test(user.matricola)) {
      return false;
    } else return true;
  };

  const checkTel = () => {
    const regex = /^[0-9]{10}$/;

    if (!regex.test(user.tel)) {
      return false;
    } else return true;
  };

  const checkBadge = () => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(user.badgeNumber)) {
      return false;
    } else return true;
  };

  const CaptchaChange = (e) => {
    setIsCaptchaSuccess(!isCaptchaSuccessful);
    console.log(e);
    const token = captchaRef.current.getValue();
    console.log("token", token);
  };

  const checkConfPassword = (e) => {
    if (e.target.value) {
      setErrConfPass((prevstate) => ({ ...prevstate, insert: false }));
    } else {
      setErrConfPass((prevstate) => ({ ...prevstate, insert: true }));
    }
    if (user.password !== e.target.value && user.password) {
      setErrConfPass((prevstate) => ({ ...prevstate, match: true }));
    } else {
      setErrConfPass((prevstate) => ({ ...prevstate, match: false }));
    }
  };

  const RegisterUser = () => {
    console.log(user);
    if (user.badgeNumber === "") {
      setUser({ ...user, badgeNumber: "0000000000" });
    } else if (user.matricola === "") {
      setUser({ ...user, matricola: "M00000000" });
    }

    fetch(`/api/guest/register/${captchaRef.current.getValue()}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/registrationConfirmation";
          setRegistrationFail(true);
        }
        if (response.status === 400) {
          setRegistrationFail(false);
          return response.text();
        }
      })
      .then((message) => {
        if (message === "CAPTCHA SCADUTO") {
          setAlertMsg("Ops... Il Captcha è scaduto attendi per riprovare! ");
        } else if (message === "DUPLICATE") {
          setAlertMsg(
            "Ops... Sembra che l'utente esista già! Prova ad effettuare il login"
          );
        } else {
          setAlertMsg(
            "Controlla che tutte le informazioni inserite siano corrette!"
          );
        }
      });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>

            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                  <div className="mb-3">
                    <Form.Group
                      className="mb-3 was-validated"
                      controlId="UserName"
                    >
                      <Form.Label className="text-center">UserName</Form.Label>
                      <Form.Control
                        className="form-control is-invalid"
                        type="text"
                        placeholder="Enter Username"
                        name="userName"
                        onChange={(e) => handleChange(e)}
                        value={user.userName}
                        required
                      />

                      {!user.userName && (
                        <div className="invalid-feedback">
                          {"Insert the Username"}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3 was-validated" controlId="Name">
                      <Form.Label className="text-center">Name</Form.Label>
                      <Form.Control
                        className="form-control id-invalid"
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        onChange={(e) => handleChange(e)}
                        value={user.name}
                        required
                      />
                      {!user.name && (
                        <div className="invalid-feedback">
                          {"Insert your Name"}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group
                      className="mb-3 was-validated"
                      controlId="Surname"
                    >
                      <Form.Label className="text-center">Surname</Form.Label>
                      <Form.Control
                        className="form-control is-invalid"
                        type="text"
                        placeholder="Enter Surname"
                        name="surname"
                        onChange={(e) => handleChange(e)}
                        value={user.surname}
                        required
                      />
                      {!user.surname && (
                        <div className="invalid-feedback">
                          {"Insert your Surname"}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="duedate">
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control
                        type="date"
                        name="birthDay"
                        placeholder="Birthday"
                        onChange={(e) => handleChange(e)}
                        value={user.birthDay}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3  was-validated"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control
                        className="form-control is-invalid"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={(e) => handleChange(e)}
                        value={user.email}
                        required
                      />
                      {!checkEmail() && (
                        <div className="invalid-feedback">
                          {"Invalid email format"}
                        </div>
                      )}
                    </Form.Group>

                    <DropdownButton
                      title={user.role}
                      id="dropdown-menu-align-right"
                      onSelect={(e) => setUser({ ...user, ["role"]: e })}
                      className="mb-3"
                    >
                      <Dropdown.Item eventKey="Studente">
                        Studente
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Supervisor">
                        Supervisor
                      </Dropdown.Item>
                    </DropdownButton>
                    {user.role !== "Select Role" && (
                      <div>
                        {user.role === "Studente" && (
                          <div>
                            <Form.Group
                              className="mb-3 was-validated"
                              controlId="Matricola"
                            >
                              <Form.Label className="text-center">
                                Matricola
                              </Form.Label>
                              <Form.Control
                                className="form-control is-invalid"
                                type="text"
                                placeholder="Enter Matricola"
                                name="matricola"
                                onChange={(e) => handleChange(e)}
                                value={user.matricola}
                                required
                              />
                              {!checkMatricola() && (
                                <div className="invalid-feedback">
                                  {"Insert your Matricola Ex: M12345678"}
                                </div>
                              )}
                            </Form.Group>
                          </div>
                        )}
                        {user.role === "Supervisor" && (
                          <div>
                            <Form.Group
                              className="mb-3 was-validated"
                              controlId="BadgeNumber"
                            >
                              <Form.Label className="text-center">
                                BadgeNumber
                              </Form.Label>
                              <Form.Control
                                className="form-control is-invalid"
                                type="text"
                                placeholder="Enter Badge Number"
                                name="badgeNumber"
                                onChange={(e) => handleChange(e)}
                                value={user.badgeNumber}
                                required
                              />
                              {!checkBadge() && (
                                <div className="invalid-feedback">
                                  {"Enter your Badge Number EX:1234567891"}
                                </div>
                              )}
                            </Form.Group>
                          </div>
                        )}

                        <Form.Group
                          className="mb-3 was-validated"
                          controlId="Telefono"
                        >
                          <Form.Label className="text-center">
                            Tel. Number
                          </Form.Label>
                          <Form.Control
                            className="form-control is-invalid"
                            type="text"
                            placeholder="Enter Tel. Number"
                            name="tel"
                            onChange={(e) => handleChange(e)}
                            value={user.tel}
                            required
                          />

                          {!checkTel() && (
                            <div className="invalid-feedback">
                              {"Invalid Tel format Ex: 3331234567"}
                            </div>
                          )}
                        </Form.Group>

                        <Form.Group
                          className="mb-3 was-validated"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            className="form-control is-invalid"
                            type="Password"
                            placeholder="Password"
                            name="password"
                            value={user.password}
                            onChange={(e) => {
                              handleChange(e);
                              validate(e);
                            }}
                            required
                          />
                          {errorMessage.minLength && (
                            <div
                              className="invalid-feedback"
                              style={{ fontSize: "12px" }}
                            >
                              {"Minimum Lenght is 8 chars"}
                            </div>
                          )}
                          {errorMessage.minUppercase && (
                            <div
                              className="invalid-feedback"
                              style={{ fontSize: "12px" }}
                            >
                              {"Insert Minimum 1 Upper Case char"}
                            </div>
                          )}
                          {errorMessage.minNumbers && (
                            <div
                              className="invalid-feedback"
                              style={{ fontSize: "12px" }}
                            >
                              {"Insert Minimum 1 Number"}
                            </div>
                          )}
                          {errorMessage.minSymbols && (
                            <div
                              className="invalid-feedback"
                              style={{ fontSize: "12px" }}
                            >
                              {"Insert Minimum 1 Special Char"}
                            </div>
                          )}
                          {errorMessage.minLowercase && (
                            <div
                              className="invalid-feedback"
                              style={{ fontSize: "12px" }}
                            >
                              {"Insert Minimum 3 Lower case Chars"}
                            </div>
                          )}
                        </Form.Group>

                        <Form.Group
                          className="mb-3 was-validated"
                          controlId="formBasicPassword2"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            className="form-control is-invalid"
                            type="password"
                            value={confirmPassw}
                            placeholder="Password"
                            name="confirmPassw"
                            onChange={(e) => {
                              setConfirmPassw(e.target.value);
                              checkConfPassword(e);
                            }}
                            required
                          />

                          {errConfPass.insert && (
                            <div
                              className="invalid-feedback"
                              style={{ fontSize: "12px" }}
                            >
                              {"Insert the confirm password"}
                            </div>
                          )}
                          {errConfPass.match && (
                            <div
                              className="invalid-feedback"
                              style={{ fontSize: "12px" }}
                            >
                              {
                                "The confirm password does not match the password"
                              }
                            </div>
                          )}
                        </Form.Group>
                        {registrationFail === false && (
                          <Container className="mt-5 d-flex justify-content-center align-items-center">
                            <Alert variant="danger" style={{ width: "400px" }}>
                              <Alert.Heading className="text-center">
                                Registrazione Fallita 😕!
                              </Alert.Heading>
                              <p className="text-center">{alertMsg}</p>
                            </Alert>
                          </Container>
                        )}

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        ></Form.Group>
                        <div className="d-grid justify-content-center">
                          <ReCAPTCHA
                            sitekey={process.env.REACT_APP_SITE_KEY}
                            onChange={(e) => {
                              CaptchaChange(e);
                            }}
                            ref={captchaRef}
                          />
                          <Button
                            className="mt-3"
                            variant="primary"
                            type="submit"
                            onClick={() => RegisterUser()}
                            disabled={!isCaptchaSuccessful}
                          >
                            Create Account
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <Link to={"/signin"} className="text-primary fw-bold">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegistrationView;
