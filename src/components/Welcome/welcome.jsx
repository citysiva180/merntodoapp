import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CredentialsContext } from "../../App";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Todo from "../Todolist/Todolist";
import "../Welcome/welcome.css";
const Welcome = () => {
  const [credentials, setCredentialsrname] = useContext(CredentialsContext);

  return (
    <div className="Welcome">
      <Navbar></Navbar>
      <h1>Welcome, {credentials && credentials.username}</h1>
      {!credentials && <Link to="/register">Register yourself!</Link>}
      <br></br>
      {!credentials && <Link to="/login">Login!</Link>}
      {credentials && <Todo />}
      <Footer></Footer>
    </div>
  );
};

export default Welcome;
