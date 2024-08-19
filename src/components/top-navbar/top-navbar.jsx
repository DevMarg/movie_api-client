import { Navbar, Nav, Container, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import "./top-navbar.scss"

export const TopNavbar = ({ user, onLogout, searchQuery, setSearchQuery }) => {
  return (
    <Navbar bg="dark" variant="dark" >
    <Container>
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        MovieSpot
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {user ? (
            <>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/" onClick={onLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>
          )}
        </Nav>
        {/* Search Form */}
        <Form className="d-flex ml-auto ms-auto">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            value={searchQuery}
            onChange={(e) => {
    console.log("Search query changed:", e.target.value);
    setSearchQuery(e.target.value);
  }}
          />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
};