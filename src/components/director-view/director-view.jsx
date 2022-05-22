import React from "react";
import PropTypes from "prop-types";
import "./director-view.scss";

import { Container, Row, Col, Button } from "react-bootstrap";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className="directorContainer">
        <Row>
          <Col>
            <div className="director-view">
              <div className="director-name">
                <span className="name">Name: </span>
                <span className="value">{director.Name}</span>
              </div>

              <div className="director-bio">
                <span className="bio">Bio: </span>
                <span className="value">{director.Bio}</span>
              </div>

              <div className="director-birth">
                <span className="birth">Birth: </span>
                <span className="value">{director.Birth}</span>
              </div>

              <div className="director-death">
                <span className="death">Death: </span>
                <span className="value">{director.Death}</span>
              </div>

              <div className="director-button-div">
                <Button
                  className="director-button mt-3"
                  variant="secondary"
                  onClick={() => {
                    onBackClick(null);
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
