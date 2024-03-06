const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
const passwordPattern =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const verifyUsernamePattern = (username: string) => {
  return usernamePattern.test(username);
};

export const verifyPasswordPattern = (password: string) => {
  return passwordPattern.test(password);
};

export const verifyEmailPattern = (email: string) => {
  return emailPattern.test(email);
};
