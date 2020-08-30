import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Navbar from "../src/components/NavBar/NavBar";
import Register from "../src/components/RegisterForm/RegisterForm.jsx";
import Footer from "../src/components/Footer/Footer";
import welcome from "../src/components/Welcome/welcome";
import login from "../src/components/login/login";
// import BucketView from "../src/components/BucketView/BucketView";
// import HelpPage from "../src/components/HelpPage/HelpPage";
// import Todo from "../src/components/Todolist/Todolist";
const CredentialsContext = React.createContext(null);

function App() {
  const credentialsState = useState(null);
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <React.Fragment>
          <BrowserRouter>
            <Navbar></Navbar>
            <Switch>
              <Route path="/" exact component={welcome}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/login" component={login}></Route>
            </Switch>
            <Footer></Footer>
          </BrowserRouter>
        </React.Fragment>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
