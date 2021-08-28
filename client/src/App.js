import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
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
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
