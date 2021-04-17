const validate = require("../middlewares/validate");
const router = require("express").Router();
const TodoSchema = require("../models/schemas/todo");

function routes() {
  router.post("/new", validate, (req, res) => {
    let todo = req.body;

    const newTodo = new TodoSchema(todo);

    newTodo
      .save()
      .then((saved) => {
        res.status(201).json({
          success: true,
          todo: {
            _id: saved._id,
            title: saved.title,
            email: saved.email,
            done: saved.done,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({ success: false, error: err.message });
      });
  });

  router.post("/my", validate, (req, res) => {
    let info = req.body;

    TodoSchema.find({ email: info.email })
      .then((todos) => {
        res.status(200).json({
          success: true,
          todos,
        });
      })
      .catch((err) => {
        res.status(500).json({ success: false, error: err.message });
      });
  });

  router.post("/update", validate, (req, res) => {
    let info = req.body;

    TodoSchema.updateOne(
      { _id: info.id },
      {
        $set: {
          title: info.title,
          done: info.done,
        },
      },
      {
        new: true,
      }
    )
      .then(() => {
        return TodoSchema.find({ email: info.email });
      })
      .then((todos) => {
        res.status(200).json({
          success: true,
          todos,
        });
      })
      .catch((err) => {
        res.status(500).json({ success: false, error: err.message });
      });
  });

  router.post("/delete", validate, (req, res) => {
    let info = req.body;

    TodoSchema.deleteOne({ _id: info.id })
      .then(() => {
        return TodoSchema.find({ email: info.email });
      })
      .then((todos) => {
        res.status(200).json({
          success: true,
          todos,
        });
      })
      .catch((err) => {
        res.status(500).json({ success: false, error: err.message });
      });
  });

  return router;
}

module.exports = routes;
