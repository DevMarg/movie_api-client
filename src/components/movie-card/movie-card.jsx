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
      title: PropTypes.string.isRequired, 
      director: PropTypes.string.isRequired 
    }).isRequired,
    onClick: PropTypes.func.isRequired 
  };