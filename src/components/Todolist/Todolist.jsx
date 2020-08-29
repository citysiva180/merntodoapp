import React, { Component } from "react";
import "../Todolist/Todolist.css";

class Todo extends Component {
  state = {
    userInput: "",
    list: [],
  };

  render() {
    return (
      <div className="ToDO">
        <div className="container">
          <h1>Lets clear up some list! :-)</h1>
        </div>
      </div>
    );
  }
}

export default Todo;
