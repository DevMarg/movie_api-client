import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import "./top-navbar.scss"

export const TopNavbar = ({ onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-0">
      <Container>
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          MovieSpot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Button variant="light" onClick={onLogout} className="ml-3">
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
