import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import  App1    from './Test'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
  <div className="container">
    <App1 />
    <App />
  </div>
  </React.StrictMode>,
  rootElement
);
