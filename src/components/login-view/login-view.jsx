import React, { useState } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import "./login-view.scss";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Validation declarations
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

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
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios
        .post("https://zachmovie.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((response) => {
          console.error(response);
        });
    }
  };

  return (
    <Container id="loginContainer">
      <Row>
        <Col>
          <CardGroup>
            <Card id="loginCard">
              <Card.Body>
                <Card.Title className="text-center">
                  Welcome to myFlix!
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">
                  Please Login to Continue
                </Card.Subtitle>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Button
                    id="loginButton"
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                </Form>
                <Card.Text>Not registered?</Card.Text>
                <div id="register-container">
                  <Link to="/register">
                    <Button id="registerButton">Register now</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) =>
    dispatch(handleSubmit(username, password)),
});

export default connect(null, mapDispatchToProps)(LoginView);
