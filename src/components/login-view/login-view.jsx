import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./login-view.scss";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <Container className="loginContainer">
      <Card className="loginCard"></Card>
      <Card.Body>
        <Card.Title className="text-center">Welcome to myFlix!</Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-center">
          Login to Continue
        </Card.Subtitle>

        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            className="loginButton"
            variant="dark"
            size="lg"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Form>
        <Card.Subtitle className="mt-4 text-muted text-center">
          Don't have an account? Register!
        </Card.Subtitle>
        <Link to={`/register`}>
          <Button className="registerButton" variant="dark" size="lg">
            Register
          </Button>
        </Link>
      </Card.Body>
    </Container>
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
