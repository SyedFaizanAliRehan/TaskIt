import { combineReducers } from "redux";
import { loginReducer } from "./login/loginReducer";

export const reducerRoot = combineReducers({
  login: loginReducer,
});
