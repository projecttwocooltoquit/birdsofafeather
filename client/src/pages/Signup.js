import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

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
    const token = mutationResponse.data.addUser.token;
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
    <div className="loginContainer">
      

      <h2 className="card-header loginHeader">Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label className="labelExtra" htmlFor="name">First Name:</label>
          <input
            className="form-input inputExtra"
            placeholder="First"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="labelExtra" htmlFor="email">Email:</label>
          <input
            className="form-input inputExtra"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label className="labelExtra" htmlFor="pwd">Password:</label>
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
          <button className="loginButton btn-block" type="submit">Submit</button>
        </div>
      </form>
      <br></br>
      <Link to="/login">← Go to Login</Link>
      <br></br>
    </div>
  );
}

export default Signup;
