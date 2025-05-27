import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout/Layout";
import LoginSignupPage from "./pages/LoginSignupPage";
import UploadVideoPage from "./pages/UploadVideoPage";
import PlayerPage from "./pages/PlayerPage";
import ProfilePage from "./pages/ProfilePage";

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  // You can also validate the token expiry if you want
  return token != null;
};

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/auth/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginSignupPage />} />

      {/* Private Routes */}

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <HomePage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/uploadvideo"
        element={
          <PrivateRoute>
            <Layout>
              <UploadVideoPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/video/:id"
        element={
          <PrivateRoute>
            <Layout>
              <PlayerPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
