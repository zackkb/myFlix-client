import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import "./main-view.scss";
import { Col, Row, Container } from "react-bootstrap";

// Adding components

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://zachmovie.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // When user is logged in (and token is present), show list of movies
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <NavbarView user={user} />

        <Container>
          <Row className="main-view justify-content-md-center">
            <Routes>
              {/* <Route
                exact
                path="/"
    element={<MainView />} */}
              render=
              {() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map((m) => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
              {/*/>*/}
              <Route
                path="/register"
                element={<RegistrationView />}
                render={() => {
                  if (user) return <Redirect to="/" />;
                  return (
                    <Col>
                      <RegistrationView />
                    </Col>
                  );
                }}
              />
              <Route
                path="/movies/:movieId"
                element={<MovieView />}
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <MovieView
                        movie={movies.find(
                          (m) => m._id === match.params.movieId
                        )}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                path="/director/:name"
                element={<DirectorView />}
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <DirectorView
                        director={
                          movies.find(
                            (m) => m.Director.Name === match.params.name
                          ).Director
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                path="/genre/:name"
                element={<GenreView />}
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <GenreView
                        genre={
                          movies.find((m) => m.Genre.Name === match.params.name)
                            .Genre
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                path="/users/:username"
                element={<ProfileView />}
                render={({ history }) => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col>
                      <ProfileView
                        history={history}
                        movies={movies}
                        user={user}
                      />
                    </Col>
                  );
                }}
              />
            </Routes>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default MainView;
