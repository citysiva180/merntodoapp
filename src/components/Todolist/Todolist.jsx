import React, { useState, useContext } from "react";
import { CredentialsContext } from "../../App";
import "../Todolist/Todolist.css";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);

  // useEffect(() => {

  // }, [todos, credentials]);

  const persist = (newTodos) => {
    fetch(`http://localhost:4000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(todos),
    }).then(() => {});
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodoList = [...todos];
    newTodoList[index].checked = !newTodoList[index].checked;
    setTodos(newTodoList);
  };

  return (
    <div className="ToDO mx-auto">
      <h1>Lets Check those items!</h1>
      <div className="input-group mx-auto w-25 d-block">
        {todos.map((todo, index) => (
          <div key={index}>
            <input
              onChange={() => toggleTodo(index)}
              className="form-check-input"
              type="checkbox"
            />
            <label>{todo.text}</label>
          </div>
        ))}
      </div>
      <br></br>
      <form onSubmit={addTodo}>
        <div className="input-group w-50 mx-auto">
          <input
            value={todoText}
            type="text"
            className="form-control"
            placeholder="Type a task"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(e) => setTodoText(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="button"
              id="button-addon2"
            >
              Add Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Todos;
