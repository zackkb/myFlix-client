import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./navbar-view.scss";
import { Link } from "react-router-dom";

export function NavbarView(props) {
  const { user } = props;

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          myFlix
        </Navbar.Brand>
        {isAuth() && user && (
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/users/${user.Username}`}>
              Profile
            </Nav.Link>
            <Button
              variant="outline-primary"
              onClick={() => {
                onLoggedOut();
              }}
            >
              Logout
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
