import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

const FavoriteMovies = ({ movies = [], favoriteMovies = [], handleFavoriteToggle }) => {
  
  const favoriteMovieIds = favoriteMovies.map(favMovie => favMovie.id);
  
  const favoriteMovieList = movies.filter(movie => favoriteMovieIds.includes(movie.id));

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col className="text-center mb-5">
          <h2>Favorite Movies</h2>
        </Col>
      </Row>
      <Row md={10} className="d-flex flex-column align-items-center ">
        {favoriteMovieList.length === 0 ? (
          <Col>
            <p>No favorite movies found.</p>
          </Col>
        ) : (
          favoriteMovieList.map((movie) => (
            <Col xs={12} sm={6} md={6} lg={12} className="mb-5" key={movie.id} >
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
