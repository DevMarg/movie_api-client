import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';
import DeleteAccount from './delete-account';
import { toast } from 'react-toastify';


const ProfileView = ({ user, token, movies, onUpdate, onDelete }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Fetch the favorite movies from the server
    fetch(`https://movie-spot-a025d6d649af.herokuapp.com/users/${user.Username}/movies/favorite-movies`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        
        if (Array.isArray(data)) {
          setFavoriteMovies(data); 
        } else {
          console.error('Unexpected response format:', data);
          toast.error('Unexpected response format'); 
        }
      })
      .catch(error => {
        console.error('Error fetching favorite movies:', error);
        toast.error('Error fetching favorite movies'); 
      });
  }, [user.Username, token]);

  const handleFavoriteToggle = (movieId) => {
    const url = `https://movie-spot-a025d6d649af.herokuapp.com/users/${user.Username}/movies/${movieId}`;
    const method = favoriteMovies.some(movie => movie.id === movieId) ? 'DELETE' : 'PATCH';

    fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          setFavoriteMovies(prevFavorites => {
            if (method === 'PATCH') {
              return [...prevFavorites, { id: movieId }];
            } else {
              return prevFavorites.filter(movie => movie.id !== movieId);
            }
          });
          toast.success('Favorite status updated successfully');
        } else {
          throw new Error('Failed to update favorite movies');
        }
      })
      .catch(error => {
        console.error('Error updating favorite movies:', error);
        toast.error('An error occurred while updating favorites');
      });
  };

  return (
    <Container className="profile-view-container container-md">
      <Row className="justify-content-center mb-4">
        <Col md={8} className="user-profile">
          <h2>User Profile</h2>
          <UpdateUser user={user} token={token} onUpdate={onUpdate}/>
          <DeleteAccount user={user} token={token} onDelete={onDelete} />
        </Col>        
      </Row>
      <Row className="justify-content-center">
      <Col md={6} className="favorite-movies-section">          
          <FavoriteMovies
            movies={movies}
            favoriteMovies={favoriteMovies}
            handleFavoriteToggle={handleFavoriteToggle}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;
