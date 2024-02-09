import {
  TEXT_FIELD_ON_BLUR,
  TEXT_FIELD_ON_CHANGE,
  TEXT_FIELD_ON_CLICK,
  TEXT_FIELD_ON_FOCUS,
} from "./textFieldActionTypes";

const text_field_on_click = (event: React.MouseEvent<HTMLElement>) => {
  return {
    type: TEXT_FIELD_ON_CLICK,
    payload: event,
  };
};

const text_field_on_change = (event: React.ChangeEvent<HTMLInputElement>) => {
  return {
    type: TEXT_FIELD_ON_CHANGE,
    payload: event,
  };
};

const text_field_on_blur = (event: React.FocusEvent<HTMLInputElement>) => {
  return {
    type: TEXT_FIELD_ON_BLUR,
    payload: event,
  };
};

const text_field_on_focus = (event: React.FocusEvent<HTMLInputElement>) => {
  return {
    type: TEXT_FIELD_ON_FOCUS,
    payload: event,
  };
};

export {
  text_field_on_click,
  text_field_on_change,
  text_field_on_blur,
  text_field_on_focus,
};
