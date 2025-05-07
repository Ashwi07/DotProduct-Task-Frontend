import axios from "axios";
import config from "../config/config";
import Cookies from "js-cookie";

export const UserLogin = async (username: string, password: string) => {
  const response = await axios.post(
    `${config.apiUrl}/api/user/cognito/signin`,
    {
      username,
      password,
    }
  );

  const token = response.data.token;
  Cookies.set("token", token, { expires: 1 });
  return response;
};
