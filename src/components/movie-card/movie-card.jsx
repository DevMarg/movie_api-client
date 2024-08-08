import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onClick }) => {
  return (
    <Card onClick={() => onClick(movie)} variant="link">
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Button onClick={() => onClick(movie)} variant="link">
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