import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './favorite-movies.scss';

const FavoriteMovies = ({ movies = [], favoriteMovies = [], handleFavoriteToggle }) => {
  
  const favoriteMovieIds = favoriteMovies.map(favMovie => favMovie.id);
  
  const favoriteMovieList = movies.filter(movie => favoriteMovieIds.includes(movie.id));

  return (
    <Container className="favorite-movies-container container-lg">
      <Row className="justify-content-md-center mb-4">
        <Col className="text-center">
          <h2 className="favorite-movies-title">Favorite Movies</h2>
        </Col>
      </Row>
      <Row className="favorite-movies-grid">
        {favoriteMovieList.length === 0 ? (
          <Col className="text-center">
            <p>No favorite movies found.</p>
          </Col>
        ) : (
          favoriteMovieList.map((movie) => (
            <Col className="mb-4" key={movie.id} >
              <MovieCard
                movie={movie}
                isFavorite={true}
                onFavoriteToggle={() => handleFavoriteToggle(movie.id)}                
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default FavoriteMovies;
