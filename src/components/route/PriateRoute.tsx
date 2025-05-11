import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

// if token exists then allow to next page otherwise go to login page
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
