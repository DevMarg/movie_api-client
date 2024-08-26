import React from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DeleteAccount = ({ user, token, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      fetch(`https://movie-spot-a025d6d649af.herokuapp.com/users/${user.Username}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            toast.success('Your account has been deleted successfully');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            onDelete();
            
            window.location.href = '/login'; 
            
          } else {
            return response.text().then(text => {
              toast.error('Error deleting account: ' + text); 
            });
          }
        })
        .catch((error) => {
          console.error('Error deleting account:', error);
          toast.error('An unexpected error occurred.'); 
        });
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete Account
    </Button>
  );
};

export default DeleteAccount;
