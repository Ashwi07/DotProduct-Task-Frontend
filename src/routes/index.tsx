import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/not-found";
import PrivateRoute from "../components/route/PriateRoute";
import DashboardPage from "../pages/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
