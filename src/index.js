// index.tsx or index.jsx
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap styles
import './assets/css/style.css';                // Your custom styles

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
