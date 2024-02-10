import { LOGIN, LOGOUT } from "./loginActionTypes";

const initialState = {
  loggedIn: false,
  user: {},
  error: null,
};

export const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        error: null,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: {},
        error: null,
      };
    default:
      return state;
  }
};
