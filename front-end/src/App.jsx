import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound, Login } from "./pages";

import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import PublicRoutes from "./components/utils/PublicRoutes";
import DashboardContent from "./pages/dashboard/DashboardContent";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoutes>
            <DashboardContent />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
