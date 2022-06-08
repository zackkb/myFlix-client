import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./main-view.scss";
import { Col, Row, Container } from "react-bootstrap";
import { setMovies, setUser, setFavoriteMovies } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";

class MainView extends React.Component {
  constructor() {
    super();
  }

  getMovies(token) {
    axios
      .get("https://zachmovie.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token, username) {
    axios
      .get(`https://zachmovie.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onLoggedIn(authData) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);

    Promise.all([
      this.getMovies(authData.token),
      this.getUser(authData.token, authData.user.Username),
    ]).then(() => {
      this.props.setFavoriteMovies(
        this.props.movies.filter((movie) =>
          this.props.user.FavoriteMovies.includes(movie._id)
        )
      );
    });
  }

  // When user is logged in (and token is present), show list of movies
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    let username = localStorage.getItem("user");

    if (accessToken !== null && username !== null) {
      Promise.all([
        this.getMovies(accessToken),
        this.getUser(accessToken, username),
      ]).then(() => {
        this.props.setFavoriteMovies(
          this.props.movies.filter((movie) =>
            this.props.user.FavoriteMovies.includes(movie._id)
          )
        );
      });
    }
  }

  render() {
    let { movies, user, favoriteMovies } = this.props;

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
                if (!user)
                  return (
                    <Col md={6}>
                      <LoginView
                        onLoggedIn={(authData) => this.onLoggedIn(authData)}
                      />
                    </Col>
                  );

                // If movie list is empty (while movies load from API), display empty page
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <MoviesList
                    movies={movies}
                    user={user}
                    favoriteMovies={favoriteMovies}
                  />
                );
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col xs={12} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path={`/users/:username`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col xs={12} md={10}>
                    <ProfileView
                      user={user}
                      favoriteMovies={favoriteMovies}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                return (
                  <Col xs={12} md={10}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path={"/director/:name"}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col xs={12} md={10}>
                    <DirectorView
                      movies={movies}
                      user={user}
                      favoriteMovies={favoriteMovies}
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
              exact
              path={"/genre/:name"}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                // If movie list is empty (while movies load from API), display empty page
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col xs={12} md={10}>
                    <GenreView
                      movies={movies}
                      user={user}
                      favoriteMovies={favoriteMovies}
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
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
    favoriteMovies: state.favoriteMovies,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setUser,
  setFavoriteMovies,
})(MainView);
