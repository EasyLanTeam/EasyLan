import "./ui/globalStyles/style.scss";

import React from "react";
import ReactDOM from "react-dom";

import App from "./ui/components/App";

const rootElement = document.querySelector("#root");

ReactDOM.render(<App />, rootElement);
