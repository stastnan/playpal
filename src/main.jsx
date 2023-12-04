import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "src/utils/store.js";

export const customTheme = extendTheme({
  fonts: {
    heading: "Quicksand, sans-serif",
    body: "Dosis, sans-serif",
  },
  colors: {
    backgroundBrown: "#0F0E1B",
    darkBrown: "#341D1F",
    lightBrown: "#BD8359",
    lightYellow: "#FFFFEE",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
