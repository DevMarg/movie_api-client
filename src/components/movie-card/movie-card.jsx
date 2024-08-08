import PropTypes from "prop-types";

export const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => {
        onClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.string.isRequired, 
      Title: PropTypes.string.isRequired, 
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired 
  };