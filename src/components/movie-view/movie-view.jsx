import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.scss";

export const MovieView = ({ movies, similarMovies, onFavoriteToggle }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) return <div>Movie not found!</div>;

  const similarMoviesList = similarMovies(movie);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container className="movie-view mt-4">
      <Row>
        <Col md={4}>
          <img
            className="movie-poster img-fluid"
            src={movie.ImageUrl}
            alt={`${movie.Title} poster`}
          />
        </Col>
        <Col md={8}>
          <div className="movie-details">
            <h2>{movie.Title}</h2>
            <p>{movie.Description}</p>
            <p>
              <strong>Genre:</strong> {movie.Genre.Name}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director.Name}
            </p>
            <p>
              <strong>Bio:</strong> {movie.Director.Bio}
            </p>
            <p>
              <strong>Born:</strong> {formatDate(movie.Director.Birthyear)}
            </p>
            <p>
              <strong>Died:</strong>{" "}
              {movie.Director.Deathyear
                ? formatDate(movie.Director.Deathyear)
                : "N/A"}
            </p>

            <Row className="mt-3">
              <Col>
                <Button
                  onClick={() => onFavoriteToggle(movie.id)}
                  variant={movie.isFavorite ? "danger" : "outline-primary"}
                  className="w-100"
                >
                  {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </Col>
            </Row>            

            <Row className="mt-2">
              <Col>
                <Link to={`/`}>
                  <Button variant="outline-secondary" className="w-100">
                    Back
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="similar-movies mt-5 mb-5">
        <Col>
          <h4 className="text-center">Similar Movies</h4>
        </Col>
      </Row>
      <Row>
        {similarMoviesList.length > 0 ? (
          similarMoviesList.map((similarMovie) => (
            <Col md={3} key={similarMovie.id}>
              <MovieCard
                movie={similarMovie}
                isFavorite={similarMovie.isFavorite}
                onFavoriteToggle={() => onFavoriteToggle(similarMovie.id)}
              />
            </Col>
          ))
        ) : (
          <Col>
            <p>No similar movies found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
        Birthyear: PropTypes.string,
        Deathyear: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
};
