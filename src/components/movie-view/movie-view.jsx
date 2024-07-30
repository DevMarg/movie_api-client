import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
    return (

        <div>
        <div>
          <img src={movie.ImageUrl} alt={movie.Title} />
        </div>
  
        <div>
          <div>
            <span>Title: </span>
            <span>{movie.Title}</span>
          </div>
        </div>
  
        <div>
          <div>
            <span>Description: </span>
            <span>{movie.Description}</span>
          </div>
        </div>
  
        <div>
          <div>
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
        </div>
  
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
  
        <div>
          <span>Bio: </span>
          <span>{movie.Director.Bio}</span>
        </div>
  
        <div>
          <span>Born: </span>
          <span>{movie.Director.Birthyear}</span>
        </div>
  
        <div>
          <span>Died: </span>
          <span>{movie.Director.Deathyear}</span>
        </div>
  
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };