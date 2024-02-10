import {
  TEXT_FIELD_IN_VALID,
  TEXT_FIELD_ON_BLUR,
  TEXT_FIELD_ON_CHANGE,
} from "./textFieldActionTypes";

const textFieldInitialState = {
  text: "",
  isError: false,
  helperText: "",
};

const textFieldReducer = (state = textFieldInitialState, action: any) => {
  switch (action.type) {
    case TEXT_FIELD_ON_CHANGE:
      return {
        ...state,
        text: action.payload.target.value,
        isError: false,
        helperText: "",
      };
    case TEXT_FIELD_ON_BLUR:
      return {
        ...state,
        isError: action.payload.target.value === "",
        helperText:
          action.payload.target.value === "" ? "This field is required" : "",
      };
    case TEXT_FIELD_IN_VALID:
      return {
        ...state,
        isError: true,
        helperText: action.payload,
      };
    default:
      return {
        ...state,
        isError: false,
        helperText: "",
      };
  }
};

export { textFieldReducer, textFieldInitialState };
