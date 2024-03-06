import axios from "axios";
import { baseURL } from "../BaseURL";

export const SignUpAPI = async ({
  first_name,
  last_name,
  user_name,
  email,
  password,
}: {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
}) => {
  return await axios.post(
    `${baseURL}/signup`,
    {
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};
