import Cookies from "js-cookie";

// check if token exists and has values
export const isAuthenticated = () => {
  const token = Cookies.get("token");
  return token && token !== "";
};
