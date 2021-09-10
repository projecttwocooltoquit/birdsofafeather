import React from "react";
// Import React Router Link component for internal hyperlinks
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Nav = () => {
  // if user is logged in, they don't see the login or signup links and instead see logout
  if (Auth.loggedIn()) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark homeNav">
        <div className="container ml-4">
          <Link to="/" className="navbar-brand">
            Birds of a Feather
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </li>
              <li className="nav-item">
                {/* using a tag instead of Link to force page reload upon nav */}
                <a href="/profile" className="nav-link">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    // if user is logged out, they have the option to log in or sign up
    return (
      <nav className="navbar navbar-expand-lg navbar-dark homeNav">
        <div className="container ml-4">
          <Link to="/" className="navbar-brand">
            Birds of a Feather
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                {/* using a tag instead of Link to force page reload upon nav */}
                <a href="/profile" className="nav-link">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default Nav;
