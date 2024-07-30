import React from "react";

export const MovieCard = ({ movie, onClick}) => {
    return (
        <div onClick={() => {
            onClick(movie);
        }}>
        {movie.Title}
        </div>
    );
};