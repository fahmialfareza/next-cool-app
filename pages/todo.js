import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../redux/actions/main";
import "../styles/Index.module.less";
import NewTodo from "../components/NewTodo";

const Todo = ({
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  userInfo: { todos, name, loading, error },
}) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = () => {
    createTodo(title);
  };

  return (
    <>
      <Head>
        <title>My Todos - {name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <NewTodo
          show={show}
          setShow={setShow}
          title={title}
          setTitle={setTitle}
          isLoading={loading}
          error={error}
          createTodo={addTodo}
        />
        <h1 className="title">Cool stuff todo Today</h1>
        <Button variant="info" className="my-2" onClick={() => setShow(!show)}>
          + Add Todo
        </Button>
        {todos && todos.length > 0
          ? todos.map((todo, i) => (
              <ListGroup key={i} className="my-2" horizontal>
                <ListGroup.Item>{todo.title}</ListGroup.Item>
                <ListGroup.Item
                  className={todo.done ? `bg-success` : "bg-warning"}
                >
                  {todo.done ? "Complete" : "Pending"}
                </ListGroup.Item>
                <Button
                  variant="success"
                  className="ml-2"
                  onClick={() => updateTodo(todo._id, todo.title, true)}
                  disabled={todo.done}
                >
                  {todo.done ? "Done" : "Mark Completed"}
                </Button>
                <Button
                  variant="danger"
                  className="mx-1"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </Button>
              </ListGroup>
            ))
          : "No Todos yet"}
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

const mapDispatchToProps = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
