import "./ui/globalStyles/style.scss";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import App from "./ui/components/App";

Modal.setAppElement("#root");

const rootElement = document.querySelector("#root");

ReactDOM.render(<App />, rootElement);
