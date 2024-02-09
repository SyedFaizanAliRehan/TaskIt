import { LOGIN, LOGOUT } from "./loginActionTypes";

const login = (user: any) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
};

export { login, logout };
