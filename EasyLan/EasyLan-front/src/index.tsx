import "./ui/globalStyles/style.scss";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./ui/components/App";

const rootElement = document.querySelector("#root");

ReactDOM.render(<App />, rootElement);
