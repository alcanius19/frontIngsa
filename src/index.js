import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// import $ from "jquery";
// import Popper from "popper.js";
import React from "react"; // module is used to write HTML code within JavaScript(also known as JSX)
import { DataProvider, DataContext } from "./componentes/context/DataContext";
import ReactDOM from "react-dom/client"; //is used to execute the render function that will display the contents onto the page
import App from "./App";

// 1 import the required dependencies
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// uri: "https://ingsa.herokuapp.com/graphql",
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </DataProvider>
);
