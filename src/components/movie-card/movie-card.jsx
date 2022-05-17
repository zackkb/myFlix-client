import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card id="movie-card">
        <Card.Img id="movie-image" variant="top" src={movie.imgURL} />
        <Card.Body>
          <Card.Title id="movie-title">{movie.Title}</Card.Title>
          <Card.Text id="movie-genre">{movie.Genre.Name}</Card.Text>
          <Button
            id="open-button"
            onClick={() => onMovieClick(movie)}
            variant="link"
          >
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
export default MovieCard;
