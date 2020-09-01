const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const todosSchema = new mongoose.Schema({
  userId: String,
  todos: [
    {
      checked: Boolean,
      text: String,
    },
  ],
});

const Todos = mongoose.model("Todos", todosSchema);

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  //Stops user from creating a new user again..
  if (user) {
    res.status(500);
    res.json({
      message: "Username Already Exists, Please pick a new Username",
    });
    return;
  }
  await User.create({ username, password });
  res.json({
    message: "success",
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  //Stops user from creating a new user again..
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "Incorrect Password or ID",
    });
    return;
  }
  await User.create({ username, password });
  res.json({
    message: "success",
  });
});

app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split("");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();
  const todosItems = req.body;
  //Stops user from creating a new user again..
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "Invalid Access",
    });
    return;
  }
  const todos = await Todos.findOne({ userId: user._id }).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: [],
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json({ todosItems });
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
