import { configureStore, Tuple } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { reducerRoot } from "./reducerRoot";

export const store = configureStore({
  reducer: reducerRoot,
  middleware: () => new Tuple(thunk),
});
