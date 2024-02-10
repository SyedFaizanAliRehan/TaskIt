import axios from "axios";
import { baseURL } from "../BaseURL";

export const LoginAPI = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return await axios.post(
    `${baseURL}/login`,
    {
      username: username,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};
