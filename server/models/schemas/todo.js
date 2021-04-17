const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    unique: false,
  },
  done: {
    type: Boolean,
    unique: false,
  },
  email: {
    type: String,
    minLength: 3,
    unique: false,
  },
});

const Todo = mongoose.model("todo", TodoSchema);
module.exports = Todo;
