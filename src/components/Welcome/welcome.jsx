import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CredentialsContext } from "../../App";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Todo from "../Todolist/Todolist";
import "../Welcome/welcome.css";
const Welcome = () => {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const Logout = () => {
    setCredentials(null);
  };
  return (
    <div className="Welcome">
      <Navbar></Navbar>
      <h1>Welcome, {credentials && credentials.username}</h1>

      <br></br>
      {!credentials && (
        <Link className="btn btn-primary" to="/register">
          Register yourself!
        </Link>
      )}
      <br></br>
      <br></br>
      {!credentials && (
        <Link className="btn btn-primary" to="/login">
          Login!
        </Link>
      )}
      {credentials && <Todo />}
      <br></br>
      {credentials && (
        <button className="btn btn-danger" onClick={Logout}>
          Logout
        </button>
      )}
      <br></br>
      <Footer></Footer>
    </div>
  );
};

export default Welcome;
