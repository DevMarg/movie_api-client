import { useState, useEffect } from "react";
import { TopNavbar } from "../top-navbar/top-navbar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
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

    console.log("Fetching movies with token:", token);

    // Append a timestamp to the URL to prevent caching
    const url = `https://movie-spot-a025d6d649af.herokuapp.com/movies?_=${Date.now()}`;

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log("Response status:", response.status); 
      return response.json();
    })
      .then((movies) => {
        console.log("Fetched data", movies);

        const moviesFromApi = movies.map((movie) => {
          return {
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
      <TopNavbar user={user} onLogout={handleLogout} />
      <Container
        fluid
        className="gradient-bg text-white min-vh-100 page-container"
      >        
          <Row className="justify-content-center">
            <Routes>
              <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                        <Col md={12} className="text-center my-3">
                        <span>
                          <Link to="/login">Return to Login</Link>
                        </span>
                        </Col>
                      </Col>
                    )}
                  </>
                }
              />

              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView
                         onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                         }} 
                          />
                          <Col md={12} className="text-center my-3">
                          <span>
                            <Link to="/signup">Click here to Signup</Link>
                          </span>
                          </Col>
                      </Col>
                    )}
                  </>
                }
              />

              <Route
                path="/movies/:movieId"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>The list is empty</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView movies={movies} />
                      </Col>
                    )}
                  </>
                }
              />

              <Route
                path="/"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>The list is empty</Col>
                    ) : (
                      <>
                        {movies.map((movie) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                      </>
                    )}
                  </>
                }
              />
            </Routes>
          </Row>        
      </Container>
    </>
  );
};
