import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onClick }) => {
  return (
    <Card onClick={() => onClick(movie)} variant="link" className="h-100">
      <Card.Img variant="top" src={movie.ImageUrl} className="movie-card-img"/>
      <Card.Body className="d-flex flex-column align-items-start">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Button onClick={() => onClick(movie)} variant="link" className="mt-auto">
          More
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.string.isRequired, 
      Title: PropTypes.string.isRequired, 
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired 
  };