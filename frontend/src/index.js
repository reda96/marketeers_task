import React, { Component } from "react";
import { render } from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
const appDiv = document.getElementById("app");
render(
  <Router>
    <App />
  </Router>,
  appDiv
);
