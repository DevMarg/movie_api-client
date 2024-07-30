import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

console.log(MovieCard);
console.log(MovieView);


export const MainView = () => {
    const [movies, setMovies] = useState([
      
        {
            id: 1,
            Title: "Stalker",
            Description: "Two men and their guide, a \"stalker\", travel through a mysterious and forbidden territory in the wilderness called \"the zone\".",
            Genre: {
              Name: "Sci-fi",
              Description: "Science fiction is a genre of speculative fiction, which typically deals with alternative ways of life made possible by technological change."
            },
            Director: {
              Name: "Andrei Tarkovsky",
              Bio: "Andrei Tarkovsky was a Russian film director and screenwriter. Widely considered one of the greatest and most influential directors in cinema history, Tarkovsky's films explore spiritual and metaphysical themes, and are noted for their slow pacing and long takes, dreamlike visual imagery, and preoccupation with nature and memory.",
              Birthyear: "1932-04-04",
              Deathyear: "1986-12-29"
            },
            ImageUrl: "https://i.ytimg.com/vi/Q3hBLv-HLEc/maxresdefault.jpg",
            Featured: true
          },
          {
            id: 2,
            Title: "Solaris",
            Description: "The crew of a space station orbiting the oceanic planet, Solaris, is going insane under mysterious circumstances. Kelvin, a psychologist, is sent there to find out the cause for this.",
            Genre: {
              Name: "Sci-fi",
              Description: "Science fiction is a genre of speculative fiction, which typically deals with alternative ways of life made possible by technological change."
            },
            Director: {
              Name: "Andrei Tarkovsky",
              Bio: "Andrei Tarkovsky was a Russian film director and screenwriter. Widely considered one of the greatest and most influential directors in cinema history, Tarkovsky's films explore spiritual and metaphysical themes, and are noted for their slow pacing and long takes, dreamlike visual imagery, and preoccupation with nature and memory.",
              Birthyear: "1932-04-04",
              Deathyear: "1986-12-29"
            },
            ImageUrl: "https://m.media-amazon.com/images/M/MV5BZmY4Yjc0OWQtZDRhMy00ODc2LWI2NGYtMWFlODYyN2VlNDQyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            Featured: true
          },
          {
            id: 3,
            Title: "La Dolce Vita",
            Description: "The film stars Marcello Mastroianni as Marcello Rubini, a tabloid journalist who, over seven days and nights, journeys through the \"sweet life\" of Rome in a fruitless search for love and happiness.",
            Genre: {
              Name: "Comedy",
              Description: "Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing."
            },
            Director: {
              Name: "Federico Fellini",
              Bio: "Federico Fellini was an Italian film director and screenwriter. He is known for his distinctive style, which blends fantasy and baroque images with earthiness.",
              Birthyear: "1920-01-20",
              Deathyear: "1993-10-31"
            },
            ImageUrl: "https://m.media-amazon.com/images/M/MV5BODQ0NzY5NGEtYTc5NC00Yjg4LTg4Y2QtZjE2MTkyYTNmNmU2L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
            Featured: true
          }

        ]);
    

const [selectedMovie, setSelectedMovie] = useState(null);

if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} 
        onBackClick={() => setSelectedMovie(null)} 
        />
    );
};

if (movies.length === 0) {
    return <div>The list is empty</div>
};

return (
    <div>
        {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => {
                setSelectedMovie(movie);
            }}
            />
        ))}
    </div>
);
};