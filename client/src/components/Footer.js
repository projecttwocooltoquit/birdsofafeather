import React from "react";
// Import hooks from React Router
import { useLocation, useHistory } from "react-router-dom";

const Footer = () => {
  // We retrieve the current `location` object data from React Router
  const location = useLocation();
  // We get React Router's history object so we can access and adjust browser history
  const history = useHistory();
  return <footer className="w-100 mt-auto text-dark p-4"></footer>;
};

export default Footer;
