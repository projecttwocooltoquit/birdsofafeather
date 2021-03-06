import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import greenbirds from "./images/greenbirds.mp4";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        name: formState.name,
      },
    });
    const token = mutationResponse.data.addProfile.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="loginContainer my-1">
      <video id="videobg" autoPlay loop muted>
        <source src={greenbirds} type="video/mp4" />
      </video>

      <h2 className="card-header loginHeader">Signup</h2>
      <div className="card-body login-body">
      <form className="signup-form" onSubmit={handleFormSubmit}>
        <div className="flex-row my-2">
          <label className="labelExtra" htmlFor="name">
            First Name:
          </label>
          <input
            className="form-input inputExtra"
            placeholder="First"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row my-2">
          <label className="labelExtra" htmlFor="email">
            Email:
          </label>
          <input
            className="form-input inputExtra"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row my-2">
          <label className="labelExtra" htmlFor="pwd">
            Password:
          </label>
          <input
            className="form-input inputExtra"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button
            className="loginButton btn-block"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      </div>
      <div className="loginLink">
        <Link to="/login" className="labelExtra">
          ??? Go to Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
