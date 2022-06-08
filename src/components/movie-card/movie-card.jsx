import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./movie-card.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addFavoriteMovie, removeFavoriteMovie } from "../../actions/actions";

function MovieCard(props) {
  const { movie, user, favoriteMovies } = props;

  const [isFav, setIsFav] = useState(false);

  // Auth for requests
  let token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    if (favoriteMovies.find((m) => m._id === movie._id)) {
      setIsFav(true);
    }
  });

  // Allows users to add a movie to their favorites
  const addFav = (movie) => {
    axios
      .post(
        `https://zachmovie.herokuapp.com/users/${user.Username}/movies/${movie._id}`
      )
      .then(() => {
        props.addFavoriteMovie(movie);
        setIsFav(!isFav);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Allow users to remove a movie from their favorites
  const removeFav = (movie) => {
    axios
      .delete(
        `https://zachmovie.herokuapp.com/users/${user.Username}/movies/${movie._id}`
      )
      .then(() => {
        props.removeFavoriteMovie(movie);
        setIsFav(!isFav);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card text="dark" border="dark" className="mb-3">
      <Card.Img variant="top" src={movie.imgURL} className="img-responsive" />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        {!isFav && (
          <Button variant="outline-primary" onClick={() => addFav(movie)}>
            Add to Favorites
          </Button>
        )}
        {isFav && (
          <Button variant="outline-danger" onClick={() => removeFav(movie)}>
            Remove from Favorites
          </Button>
        )}
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">More Info</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default connect(null, { removeFavoriteMovie, addFavoriteMovie })(
  MovieCard
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired,
  }).isRequired,
};
