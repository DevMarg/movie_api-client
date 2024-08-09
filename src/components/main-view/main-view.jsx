import { useState, useEffect } from "react";
import { TopNavbar } from "../top-navbar/top-navbar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) return;

    // Append a timestamp to the URL to prevent caching
    const url = `https://movie-spot-a025d6d649af.herokuapp.com/movies?_=${Date.now()}`;

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log("Fetched data", movies);

        const moviesFromApi = movies.map((movie) => {
          return  {
            id: movie._id,
            ImageUrl: movie.ImageUrl,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birthyear: movie.Director.Birthyear,
              Deathyear: movie.Director.Deathyear,
            },
          };
        });

        setMovies(moviesFromApi);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <>
    <TopNavbar onLogout={handleLogout} />
    <Container fluid className="gradient-bg text-white min-vh-100 page-container">
      <Row className="justify-content-center">      
        {!user ? (
          <Col xs={12} sm={8} md={6} lg={4} className="mb-4">
            <Row className="mb-4">
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
            </Row>
            <Row>
              <SignupView />
            </Row>
          </Col>
        ) : selectedMovie ? (
          <Col xs={12} md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col key={movie.id} md={3} className="mb-5">
                <MovieCard
                  movie={movie}
                  onClick={(movie) => {
                    setSelectedMovie(movie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
    </>
  );
};
