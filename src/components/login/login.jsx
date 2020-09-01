import React, { useState, useContext } from "react";
import "../RegisterForm/RegisterForm.css";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../../App";
// import "../../server";

const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    console.log("message", message);
    throw Error(message);
  }
  return response.json();
};

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);
  const login = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });
        history.push("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const history = useHistory();

  return (
    <div className="RegisterPage">
      <div className="Register mx-auto">
        <h1>Login</h1>
        <p>{""}</p>
        <p>Wecome to Strike-it, Please login to proceed</p>
        {error && (
          <div className="alert alert-danger" role="alert">
            "Invalid credentials used!"
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <p>{""}</p>
        <form onSubmit={login}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
