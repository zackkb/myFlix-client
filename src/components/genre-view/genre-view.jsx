import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  render() {
    const { genre, movie, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>Genre</Card.Title>
          <Container className="genre-view">
            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles">Title: </Card.Text>
              <span className="movie-director-bio card-text  ml-3 ">
                {genre.Name}
              </span>
            </Col>

            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles">Description: </Card.Text>
              <span className="movie-director-bio card-text  ml-3 ">
                {genre.Description}
              </span>
            </Col>
          </Container>
          <Button
            className="custom-btn"
            type="submit"
            onClick={() => {
              onBackClick();
            }}
          >
            Go back
          </Button>
          <p></p>
          <Link to={`/`}>
            <Button className="custom-btn" type="submit">
              Back to List
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};

export default GenreView;
