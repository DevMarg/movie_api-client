import PropTypes from "prop-types";

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

// Define the expected prop types
MovieView.propTypes = {
  movie: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired, // Movie image URL
    title: PropTypes.string.isRequired, // Movie title
    description: PropTypes.string.isRequired, // Movie description
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired, // Genre name
      description: PropTypes.string // Genre description (optional)
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired, // Director name
      bio: PropTypes.string.isRequired, // Director bio
      born: PropTypes.string.isRequired, // Director birth year
      died: PropTypes.string.isRequired // Director death year
    }).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired // Function to handle back button click
};
  