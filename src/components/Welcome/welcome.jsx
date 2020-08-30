import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CredentialsContext } from "../../App";

const Welcome = () => {
  const [credentials, setCredentialsrname] = useContext(CredentialsContext);

  return (
    <div className="Welcome">
      <h1>Welcome, {credentials && credentials.username}</h1>
      {!credentials && <Link to="/register">Register yourself!</Link>}
    </div>
  );
};

export default Welcome;
