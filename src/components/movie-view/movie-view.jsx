import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img id="movie__img" src={movie.imgURL} />
        </div>
        <br />
        <div className="movie-title">
          <span className="movie__title">{movie.Title}</span>
        </div>
        <br />
        <div className="movie-description">
          <span className="movie__header">Description: </span>
          <span className="movie__text">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="movie__header">Genre: </span>
          <span className="movie__text">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="movie__header">Director: </span>
          <span className="movie__text">{movie.Director.Name}</span>
        </div>
        <button
          id="back-button"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </button>
      </div>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
