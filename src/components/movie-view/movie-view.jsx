import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";

import { Col, Row, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <>
        <div>
          <Button
            variant="outline-light"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </div>

        <div className="movie-title">
          <h1 className="display-4">{movie.Title}</h1>
        </div>
        <div className="movie-img text-left">
          <img src={movie.imgURL} width="350" className="img-fluid" />
        </div>

        <div>
          <Link to={`/genre/${movie.Genre.Name}`} className="d-inline-flex">
            <Badge pill bg="light" text="dark">
              {movie.Genre.Name}
            </Badge>
          </Link>
        </div>
        <br></br>
        <div>
          Director:{" "}
          <Link
            to={`/director/${movie.Director.Name}`}
            className="d-inline-flex"
          >
            {movie.Director.Name}
          </Link>
        </div>

        <br />
        <div>
          <span className="value">{movie.Description}</span>
        </div>
        <br></br>
        <div>
          <span className="description">Released: {movie.Year}</span>
        </div>
        <br></br>
        <Link to={"/"}>
          <Button variant="dark">Back to list</Button>
        </Link>
      </>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    imgURL: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
