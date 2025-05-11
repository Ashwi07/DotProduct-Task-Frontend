import axios from "axios";
import config from "../config/config";
import Cookies from "js-cookie";

// login
export const UserLogin = async (username: string, password: string) => {
  const response = await axios.post(
    `${config.apiUrl}/api/user/cognito/signin`,
    {
      username,
      password,
    }
  );

  Cookies.set("token", response.data.token, { expires: 1 });
  Cookies.set("username", response.data.data.name, { expires: 1 });
  return response;
};
