import { useState, useEffect } from "react";
import { TopNavbar } from "../top-navbar/top-navbar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import ProfileView from "../profile-view/profile-view";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (!token) return;

    console.log("Fetching movies with token:", token);

    // Fetch the movies from the backend
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

        const moviesFromApi = movies.map((movie) => ({
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
        }));

        setMovies(moviesFromApi);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  useEffect(() => {
    console.log("Current search query:", searchQuery);
    console.log("Current movies:", movies);

    if (movies.length > 0) {
      const results = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(results);
      setNoResults(results.length === 0); // Update noResults state
    }
  }, [searchQuery, movies]);

  const getSimilarMovies = (currentMovie) => {
    return movies.filter(
      (movie) =>
        movie.Genre.Name === currentMovie.Genre.Name &&
        movie.id !== currentMovie.id
    );
  };

  const handleFavoriteToggle = (movieId) => {
    const url = `https://movie-spot-a025d6d649af.herokuapp.com/users/${user.Username}/movies/${movieId}`;
    const method = user.FavoriteMovies.some((fav) => fav === movieId)
      ? "DELETE"
      : "PATCH";
    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          const updatedFavorites =
            method === "PATCH"
              ? [...user.FavoriteMovies, movieId]
              : user.FavoriteMovies.filter((id) => id !== movieId);
          const updatedUser = { ...user, FavoriteMovies: updatedFavorites };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));

          const updatedMovies = movies.map((movie) =>
            movie.id === movieId
              ? { ...movie, isFavorite: method === "PATCH" }
              : movie
          );
          setMovies(updatedMovies);

          toast.success("Favorites updated!");
        } else {
          throw new Error("Failed to update favorite movies");
        }
      })
      .catch((error) => {
        console.error("Error updating favorite movies:", error);
        toast.error("An error occurred while updating favorites");
      });
  };

  const handleUpdate = (updatedUser) => {
    console.log("User data received from update-user.jsx:", updatedUser);
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleDelete = () => {
    fetch(`https://movie-spot-a025d6d649af.herokuapp.com/users/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete account");
        }
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const movieSlides = (moviesArray) => {
    return moviesArray.reduce((acc, movie, index) => {
      if (index % 3 === 0) acc.push([]); // Start a new slide every 3 items
      acc[acc.length - 1].push(movie);
      return acc;
    }, []);
  };

  const carouselSlides = movieSlides(filteredMovies);
  const showControls = carouselSlides.length > 1; // Only show controls if more than one slide

  return (
    <>
      <TopNavbar
        user={user}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
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
                    <Col>Loading</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView
                        movies={movies}
                        similarMovies={(currentMovie) =>
                          getSimilarMovies(currentMovie)
                        }
                        onFavoriteToggle={(movieId) =>
                          handleFavoriteToggle(movieId)
                        }
                        isFavorite={(movieId) =>
                          user.FavoriteMovies.includes(movieId)
                        }
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col md={8}>
                      <ProfileView
                        user={user}
                        token={token}
                        movies={movies}
                        onFavoriteToggle={(movieId) =>
                          handleFavoriteToggle(movieId)
                        }
                        isFavorite={(movieId) =>
                          user.FavoriteMovies.includes(movieId)
                        }
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                      />
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
                  ) : noResults ? (
                    <Col className="text-center">
                      <h3>Movie not found</h3>
                    </Col>
                  ) : movies.length === 0 ? (
                    <Col>Loading</Col>
                  ) : (
                    <Col md={12}>
                      <Carousel
                        className="movie-carousel"
                        interval={null}
                        controls={showControls} // Only show controls if more than one slide
                      >
                        {carouselSlides.map((slideMovies, slideIndex) => (
                          <Carousel.Item key={slideIndex}>
                            <div className="carousel-slide">
                              {slideMovies.map((movie) => (
                                <div
                                  className="carousel-item-container"
                                  key={movie.id}
                                >
                                  <MovieCard
                                    movie={movie}
                                    isFavorite={user.FavoriteMovies.includes(movie.id)}
                                    onFavoriteToggle={() =>
                                      handleFavoriteToggle(movie.id)
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </Col>
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