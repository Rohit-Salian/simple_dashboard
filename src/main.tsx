import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import FilterReducer from "./redux/FilterReducer.js";
import { Provider } from "react-redux";
import { loadState } from "./redux/localStorage.ts";
import { localStorageMiddleware } from "./redux/localStorageMiddleware.ts";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    filter: FilterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
