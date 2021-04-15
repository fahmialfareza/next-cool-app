import * as t from "../types";

const initialState = {
  name: "guest",
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return { ...state };
  }
};

export default main;
