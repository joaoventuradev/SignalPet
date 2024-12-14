import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TranslationProvider } from "./service/TranslationProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </React.StrictMode>
);
