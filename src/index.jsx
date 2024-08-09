import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { MainView } from "./components/main-view/main-view";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import "./index.scss";

const MyMovieApplication = () => {
  return (
    <Router>
      <Container>
        <MainView />
      </Container>
    </Router>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyMovieApplication />);


console.log(MainView);