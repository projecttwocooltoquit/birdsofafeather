import React, { useState, useEffect } from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import Loading from "./components/Loading";

const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App(props) {
  // loading Spinner
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  });
  return (
    <div>
      {isLoading === true ? (
        <Loading />
      ) : (
        <ApolloProvider client={client}>
          {/* Wrap page elements in Router component to keep track of location state */}
          <Router>
            <div>
              <Nav />
              <div>
                {/* Define routes to render different page components at different paths */}
                <Route exact path="/" component={Home} />
                {/* Define a route that will take in variable data */}
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
              </div>
              <Footer />
            </div>
          </Router>
        </ApolloProvider>
      )}
    </div>
  );
}

export default App;
