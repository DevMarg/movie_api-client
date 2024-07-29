import { createRoot } from "react-dom/client";
import React from "react";
import "./index.scss";

const MyMovieApplication = () => {
    return (
        <div className="my-movie">
            <div>Good day!</div>
        </div>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyMovieApplication />);