import { Link } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import "./index.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-wrapper">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page not found</h2>
      <p className="not-found-message">
        We can't find the page you are looking for
      </p>
      {/* If authenticated go to dashborad otherwise go to login page */}
      <Link
        to={isAuthenticated() ? "/dashboard" : "/"}
        className="not-found-button"
      >
        Go to home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
