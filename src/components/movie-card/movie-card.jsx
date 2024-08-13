import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, onFavoriteToggle }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImageUrl} className="movie-card-img"/>
      <Card.Body className="d-flex flex-column align-items-start">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant="primary" onClick={onFavoriteToggle}>
          {movie.isFavorite ? "Unfavorite" : "Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({       
      Title: PropTypes.string.isRequired, 
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired    
  };