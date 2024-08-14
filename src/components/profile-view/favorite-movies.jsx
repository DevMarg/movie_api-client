import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

const FavoriteMovies = ({ movies = [], favoriteMovies = [], handleFavoriteToggle }) => {
  
  const favoriteMovieIds = favoriteMovies.map(favMovie => favMovie.id);
  
  const favoriteMovieList = movies.filter(movie => favoriteMovieIds.includes(movie.id));

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col className="text-center">
          <h2>Favorite Movies</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        {favoriteMovieList.length === 0 ? (
          <Col>
            <p>No favorite movies found.</p>
          </Col>
        ) : (
          favoriteMovieList.map((movie) => (
            <Col className="mb-5" key={movie.id} xs={12} md={6} lg={3}>
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
