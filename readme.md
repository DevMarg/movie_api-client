# Movie Database Client-Side Application

A client-side application for the movie database Movie_API. 
The application was built with React and React Bootstrap, with React Router for client-side routing.

## Features

## 1. User Authentication
- **Signup:** Allows new users to create an account by providing username, email, and password.
- **Login:** Authenticates users with their credentials and provides access to the application.
- **Logout:** Logs out the current user and redirects to the login page.

## 2. Movie Browsing and Viewing
- **Home Page:** Displays a carousel of movies, with each movie shown as a card that includes an image, title, and description.
- **Search Functionality:** Users can search for movies by title using a search bar. The list updates dynamically based on the search query.
- **Movie Details View:** Displays detailed information about a selected movie, including its title, description, image, genre, and director information.

## 3. Movie Favorites
- **Add/Remove Favorites:** Users can mark movies as favorites and toggle this status. Favorite status is indicated in the UI.
- **Display Favorites:** Favorite movies are displayed on the user’s profile page.

## 4. User Profile Management
- **Profile View:** Shows user information and their list of favorite movies.
- **Update Profile:** Allows users to update their profile details such as email and password.
- **Delete Account:** Enables users to delete their account and remove all associated data.

## 5. Responsive Design
- **Responsive Navbar:** The navigation bar collapses into a hamburger menu on smaller screens for better usability.
- **Responsive Layouts:** Ensures that the application is fully functional and visually appealing across different screen sizes and devices.

## 6. Routing and Navigation
- **Client-Side Routing:** Utilizes React Router for navigating between different views such as Home, Movie Details, Profile, Login, and Signup.
- **Protected Routes:** Restricts access to certain pages (e.g., profile, movie details) to authenticated users only.

## 7. User Feedback
- **Toast Notifications:** Provides feedback to users for actions such as adding/removing favorites or updating profile details.
- **Error Handling:** Displays appropriate error messages for failed operations or issues.

## 8. Dynamic Content
- **Movie Carousel:** Displays a dynamic carousel of movies that adjusts based on the available content.
- **Similar Movies:** Shows a list of movies similar to the currently viewed movie based on genre.

## 9. API Integration
- **Movie Data Fetching:** Fetches movie data from the Movie_API and updates the UI based on the API response.
- **User Data Handling:** Manages user authentication and updates using API calls.

## 10. User Interface Enhancements
- **Bootstrap Components:** Utilizes React Bootstrap components for styling and layout, including Navbars, Forms, Buttons, and Carousels.
- **Custom Styling:** Implements custom CSS/SASS for additional styling and adjustments to match the application's branding.

## Dependencies

- React
- React Router
- React Bootstrap
- Bootstrap
- Fetch API for HTTP requests

## Installation

1. Clone the repository to your local machine.

   ```sh
   git clone https://github.com/DevMarg/movie_api-client.git
   ```
2. Navigate to the Project Directory

    ```sh
    cd movie_api-client
    ```
3. Install Dependencies

Install the required dependencies (Parcel, React, and ReactDOM) using npm.
This command will read the package.json file and install all necessary packages listed under dependencies and devDependencies.

    ```sh
    npm install
    ```
4. Build the Application

     ```sh
    npm run build
    ```

## Hosting

This project is hosted on Netlify: https://movie-spot-c4ff17.netlify.app/

