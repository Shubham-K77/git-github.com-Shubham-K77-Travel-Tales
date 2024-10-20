import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SnackbarProvider>
    </BrowserRouter>
  </StrictMode>
);
