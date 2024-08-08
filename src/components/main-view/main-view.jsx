import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);            
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={(movie) => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};
