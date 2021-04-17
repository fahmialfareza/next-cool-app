require("dotenv").config();
const express = require("express");
const next = require("next");
const cors = require("cors");
const connect = require("./models/connect");

const PORT = process.env.PORT;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const routes = require("./routes/index");
  const authRouter = require("./routes/auth-router");
  const todoRouter = require("./routes/todo-router");

  server.use(cors());
  server.use(express.json());

  server.use("/api", routes(server));
  server.use("/api/auth/", authRouter(server));
  server.use("/api/todo/", todoRouter(server));

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  connect();

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`>_ Ready on ${PORT}`);
  });
});
