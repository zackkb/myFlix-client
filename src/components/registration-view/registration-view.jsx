import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./registration-view.scss";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // Declare hook for each input

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthdayErr, setBirthdayErr] = useState("");

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr("Username must be at least 3 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be at least 6 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Please enter an email address");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Please enter a valid email address");
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();

    if (isReq) {
      axios
        .post("https://zachmovie.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful! You may now login.");
          window.open("/", "_self");
        })
        .catch((response) => {
          console.log(response);
          alert("Unable to register!");
        });
    }
  };

  return (
    <Container id="registration-form">
      <Row>
        <Col>
          <CardGroup>
            <Card id="registration-card">
              <Card.Body>
                <Card.Title id="registration-card-title">
                  Register to use myFlix!
                </Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label id="registration-form-label">
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label id="registration-form-label">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter a Password"
                      minLength="6"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label id="registration-form-label">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email adress"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label id="registration-form-label">
                      Birthday
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                      placeholder="DD-MM-YYYY"
                    />
                    {birthdayErr && <p>{birthdayErr}</p>}
                  </Form.Group>

                  <Button
                    id="register-button"
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};

export default RegistrationView;
