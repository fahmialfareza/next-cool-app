const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    unique: false,
  },
  age: {
    type: Number,
    minLength: 1,
    unique: false,
  },
  email: {
    type: String,
    minLength: 3,
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    unique: false,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
