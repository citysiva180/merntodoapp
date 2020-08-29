import React from "react";
import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Navbar from "../src/components/NavBar/NavBar";
import toDopage from "../src/components/Todolist/Todolist";
import Register from "../src/components/RegisterForm/RegisterForm.jsx";
import BucketView from "../src/components/BucketView/BucketView";
import Footer from "../src/components/Footer/Footer";
import HelpPage from "../src/components/HelpPage/HelpPage";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <BrowserRouter>
          <Navbar></Navbar>
          <Switch>
            <Route path="/" exact component={toDopage}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/bucketview" component={BucketView}></Route>
            <Route path="/helppage" component={HelpPage}></Route>
          </Switch>
          <Footer></Footer>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

export default App;
