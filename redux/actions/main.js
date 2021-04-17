import * as t from "../types";
import axios from "axios";
import { request } from "../../utils/request";

export const setInfo = (name) => (dispatch) =>
  dispatch({
    type: t.SET_NAME,
    payload: name,
  });

export const signOut = () => (dispatch) => {
  localStorage.removeItem("user_info");
  dispatch({
    type: t.SIGNOUT,
  });
};

export const restore = (data) => (dispatch) =>
  dispatch({
    type: t.REGISTER,
    payload: data,
  });

export const userSignUp = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true,
    });

    const apiResponse = await axios.post(
      process.env.API_ADDRESS + "/api/auth/register",
      formData
    );

    if (apiResponse.data.success) {
      localStorage.setItem("user_info", JSON.stringify(apiResponse.data.user));
      dispatch({
        type: t.REGISTER,
        payload: apiResponse.data.user,
      });
    }
  } catch (e) {
    dispatch({
      type: t.LOADING,
      payload: false,
    });

    dispatch({
      type: t.ERROR,
      payload: e.response.data.error,
    });
  }
};

export const userSignIn = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true,
    });

    const apiResponse = await axios.post(
      process.env.API_ADDRESS + "/api/auth/login",
      formData
    );

    if (apiResponse.data.success) {
      localStorage.setItem("user_info", JSON.stringify(apiResponse.data.user));
      dispatch({
        type: t.REGISTER,
        payload: apiResponse.data.user,
      });
    }
  } catch (e) {
    dispatch({
      type: t.LOADING,
      payload: false,
    });

    dispatch({
      type: t.ERROR,
      payload: e.response.data.error,
    });
  }
};

export const getTodos = () => async (dispatch) => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true,
    });

    const userData = JSON.parse(localStorage.getItem("user_info"));
    const email = userData ? userData.email : "";

    const apiResponse = await request.post("/api/todo/my", { email });

    dispatch({
      type: t.GET_TODOS,
      payload: apiResponse.data.todos,
    });
  } catch (e) {
    dispatch({
      type: t.LOADING,
      payload: false,
    });

    dispatch({
      type: t.ERROR,
      payload: e.response.data.error,
    });
  }
};

export const createTodo = (title) => async (dispatch) => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true,
    });

    const userData = JSON.parse(localStorage.getItem("user_info"));
    const email = userData ? userData.email : "";

    const apiResponse = await request.post("/api/todo/new", {
      title,
      email,
      done: false,
    });

    dispatch({
      type: t.CREATE_TODO,
      payload: apiResponse.data.todo,
    });
  } catch (e) {
    dispatch({
      type: t.LOADING,
      payload: false,
    });

    dispatch({
      type: t.ERROR,
      payload: e.response.data.error,
    });
  }
};

export const updateTodo = (id, title, done) => async (dispatch) => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true,
    });

    const userData = JSON.parse(localStorage.getItem("user_info"));
    const email = userData ? userData.email : "";

    const apiResponse = await request.post("/api/todo/update", {
      id,
      title,
      email,
      done,
    });

    dispatch({
      type: t.UPDATE_TODO,
      payload: apiResponse.data.todos,
    });
  } catch (e) {
    dispatch({
      type: t.LOADING,
      payload: false,
    });

    dispatch({
      type: t.ERROR,
      payload: e.response.data.error,
    });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    dispatch({
      type: t.LOADING,
      payload: true,
    });

    const userData = JSON.parse(localStorage.getItem("user_info"));
    const email = userData ? userData.email : "";

    const apiResponse = await request.post("/api/todo/delete", { id, email });

    dispatch({
      type: t.DELETE_TODO,
      payload: apiResponse.data.todos,
    });
  } catch (e) {
    dispatch({
      type: t.LOADING,
      payload: false,
    });

    dispatch({
      type: t.ERROR,
      payload: e.response.data.error,
    });
  }
};
