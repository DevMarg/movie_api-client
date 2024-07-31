import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  

  useEffect(() => {
    fetch("https://movie-spot-a025d6d649af.herokuapp.com/movies")
      .then((response) => response.json())
      .then((movies) => {
        console.log("Fetched data", movies);

        const moviesFromApi = movies.map((movie) => {
          return {
            id: movie._id, // Unique identifier
            ImageUrl: movie.ImageUrl, // Image URL for the movie
            Title: movie.Title, // Movie title
            Description: movie.Description, // Movie description
            Genre: {
              Name: movie.Genre.Name, // Genre name
              Description: movie.Genre.Description // Genre description
            },
            Director: {
              Name: movie.Director.Name, // Director name
              Bio: movie.Director.Bio, // Director biography
              Birthyear: movie.Director.Birthyear, // Director birth year
              Deathyear: movie.Director.Deathyear // Director death year
            }
          };
        });

        setMovies(moviesFromApi);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, []);

  

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
