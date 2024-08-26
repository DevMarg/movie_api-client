import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const UpdateUser = ({ user, token, onUpdate }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(user.Birthday.slice(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!username || !email) {
      toast.error("Username and email cannot be blank. Please fill out all required fields.");
      return; // Stop the submission if validation fails
    }

    const [year, month, day] = birthday.split("-");
    const formattedBirthday = `${day}/${month}/${year}`;

    // Prepare the update data, conditionally including the password
    const updateData = {
      Username: username,
      Email: email,
      Birthday: formattedBirthday,
    };

    if (password) {
      updateData.Password = password; // Only include the password if it has been provided
    }

    console.log("Submitting update with data:", updateData);

    // Update user info logic
    fetch(
      `https://movie-spot-a025d6d649af.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          let userFriendlyMessage = "An error occurred while updating your profile.";

          if (response.status === 403) {
            userFriendlyMessage = "You do not have permission to update this profile. Please log in again.";
            handlePermissionError();
          } else if (response.status === 401) {
            userFriendlyMessage = "Your session has expired. Please log in again.";
            handlePermissionError();
          } else if (response.status === 400) {
            userFriendlyMessage = "There was an issue with the data you provided. Please check your inputs.";
          } else if (response.status === 500) {
            userFriendlyMessage = "Our servers are currently down. Please try again later.";
          } else {
            userFriendlyMessage = `Unexpected error: Please check your inputs.`;
          }

          toast.error(userFriendlyMessage);
          throw new Error(userFriendlyMessage);
        }
        return response.json();
      })
      .then((updatedUser) => {
        console.log("User updated successfully:", updatedUser);
        onUpdate(updatedUser);
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user:", error.message);        
      });
  };

  // Function to handle permission errors and token issues
  const handlePermissionError = () => {
    // Clear user data from local storage or session storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect the user to the login page
    window.location.href = "/login";
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="justify-content-center mb-4 mt-4"
      >
        Update
      </Button>
    </Form>
  );
};

export default UpdateUser;
