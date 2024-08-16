import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Button, Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";
import './heart-button.scss';

export const MovieCard = ({ movie, onFavoriteToggle }) => {
  
  const HeartButton = ({ isFavorite, onFavoriteToggle }) => {    
    const [isLiked, setIsLiked] = useState(isFavorite);

    useEffect(() => {
      
      setIsLiked(isFavorite);
    }, [isFavorite]);

    const handleLike = () => {
      onFavoriteToggle();  
      setIsLiked(!isLiked);
    };

    return (
      
      <button
        onClick={handleLike}
        className={`heart-button ${isLiked ? 'liked' : ''}`}
      >
        {isLiked ? '❤️' : '🤍'}
      </button>
      
      
    );
  };

  return (
    <Card className="h-100 movie-card">
      <Card.Img variant="top" src={movie.ImageUrl} className="movie-card-img" />
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <HeartButton
          isFavorite={movie.isFavorite}
          onFavoriteToggle={() => onFavoriteToggle(movie.id)} 
        />
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
