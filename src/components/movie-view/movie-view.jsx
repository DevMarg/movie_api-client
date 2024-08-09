import PropTypes from "prop-types";
import "./movie-view.scss";
import { Row, Col, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Row className="justify-content-md-center">
    <Col md={8}>
      <div className="movie-view">
        <div className="movie-poster mb-4">
          <img src={movie.ImageUrl} alt={movie.Title} className="w-100" />
        </div>

        <Row>
          <Col md={6}>
            <div className="mb-2">
              <h5>Title:</h5>
              <p>{movie.Title}</p>
            </div>

            <div className="mb-2">
              <h5>Description:</h5>
              <p>{movie.Description}</p>
            </div>

            <div className="mb-2">
              <h5>Genre:</h5>
              <p>{movie.Genre.Name}</p>
            </div>

            <div className="mb-2">
              <h5>Director:</h5>
              <p>{movie.Director.Name}</p>
            </div>
          </Col>

          <Col md={6}>
            <div className="mb-2">
              <h5>Bio:</h5>
              <p>{movie.Director.Bio}</p>
            </div>

            <div className="mb-2">
              <h5>Born:</h5>
              <p>{formatDate(movie.Director.Birthyear)}</p>
            </div>

            <div className="mb-2">
              <h5>Died:</h5>
              <p>{movie.Director.Deathyear ? formatDate(movie.Director.Deathyear) : "N/A"}</p>
            </div>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="primary" onClick={onBackClick}>
            Back
          </Button>
        </div>
      </div>
    </Col>
  </Row>
);
};

MovieView.propTypes = {
movie: PropTypes.shape({
  ImageUrl: PropTypes.string,
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string,
  }).isRequired,
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string.isRequired,
    Deathyear: PropTypes.string.isRequired,
  }).isRequired,
}).isRequired,
onBackClick: PropTypes.func.isRequired,
};
