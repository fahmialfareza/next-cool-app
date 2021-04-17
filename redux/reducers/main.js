import * as t from "../types";

const initialState = {
  name: "guest",
  loading: false,
  error: null,
  todos: [],
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        name: action.payload,
        loading: false,
      };
    case t.REGISTER: {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        age: action.payload.age,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    }
    case t.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case t.SIGNOUT:
      return {
        name: "guest",
        loading: false,
      };
    case t.ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case t.GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case t.CREATE_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.payload),
        loading: false,
      };
    case t.DELETE_TODO:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case t.UPDATE_TODO:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default main;
