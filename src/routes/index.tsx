import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/not-found";
import PrivateRoute from "../components/route/PriateRoute";
import DashboardPage from "../pages/dashboard";
import NavbarLayout from "../components/layouts/NavbarLayout";
import InputsPage from "../pages/inputs";
import TransactionsPage from "../pages/transactions";
import GlobalSettingsPage from "../pages/globalSettings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<NavbarLayout />}>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/inputs"
          element={
            <PrivateRoute>
              <InputsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <TransactionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <GlobalSettingsPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
