import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Register from "../src/components/RegisterForm/RegisterForm";

import Welcome from "../src/components/Welcome/welcome";
import login from "../src/components/login/login";
// import BucketView from "../src/components/BucketView/BucketView";
// import HelpPage from "../src/components/HelpPage/HelpPage";
// import Todo from "../src/components/Todolist/Todolist";
export const CredentialsContext = React.createContext({});

function App() {
  const credentialsState = useState({});
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <React.Fragment>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Welcome}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/login" component={login}></Route>
            </Switch>
          </BrowserRouter>
        </React.Fragment>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
