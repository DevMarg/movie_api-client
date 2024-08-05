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


MovieView.propTypes = {
  movie: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired, 
    description: PropTypes.string.isRequired, 
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired, 
      description: PropTypes.string 
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired, 
      bio: PropTypes.string.isRequired, 
      born: PropTypes.string.isRequired, 
      died: PropTypes.string.isRequired 
    }).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired 
};
  