import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../../App";
import { v4 as uuidv4 } from "uuid";
import "../Todolist/Todolist.css";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);
  const [filter, setFilter] = useState("uncompleted");

  // useEffect(() => {

  // }, [todos, credentials]);

  const persist = (newTodos) => {
    fetch(`http://localhost:4000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  useEffect(() => {
    fetch(`http://localhost:4000/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

  const getTodos = () => {
    return todos.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="ToDO mx-auto">
      <h1>Lets Check those items!</h1>

      <div className="input-group mx-auto w-25 d-block">
        <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>

        {getTodos().map((todo) => (
          <div key={todo.id}>
            <input
              checked={todo.checked}
              onChange={() => toggleTodo(todo.id)}
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
            onChange={(e) => setTodoText(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-success" type="submit">
              Add Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Todos;
