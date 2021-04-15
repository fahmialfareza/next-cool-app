const mongoose = require("mongoose");

const connectURI = process.env.MONGO_DB_URI;

const connect = () => {
  mongoose
    .connect(connectURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(e.message));
};

module.exports = connect;
