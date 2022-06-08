import React from "react";
import PropTypes from "prop-types";
import "./director-view.scss";
import { Card, Row, Col, Button } from "react-bootstrap";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return (
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="director-view">
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text>Bio: {director.Bio}</Card.Text>
              <Card.Text>Birth: {director.Birth}</Card.Text>
              <Card.Text>Death: {director.Death}</Card.Text>
              <Button
                variant="dark"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
