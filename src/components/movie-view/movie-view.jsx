import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card className="movie-view">
              <Card.Body>
                <Card.Img
                  id="movie-view-image"
                  variant="top"
                  src={movie.imgURL}
                />
                <Card.Title id="movie-title" className="movie-title">
                  {movie.Title}
                </Card.Title>
                <Card.Text id="movie-description" className="movie-description">
                  {movie.Description}
                </Card.Text>

                <Link to={`/director/${movie.Director.Name}`}>
                  <Button
                    variant="link"
                    id="movie-director"
                    className="movie-director"
                  >
                    Director: {movie.Director.Name}
                  </Button>
                </Link>

                <Link to={`/genre/${movie.Genre.Name}`}>
                  <Button
                    variant="link"
                    id="movie-genre"
                    className="movie-gerne"
                  >
                    Genre: {movie.Genre.Name}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
            <Button
              id="movie-view-button"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired,

    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,

    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieView;
