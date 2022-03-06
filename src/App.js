import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import FavoritesPage from "./components/FavoritesPage";
import Menu from "./components/Menu";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute isPrivate={false}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute isPrivate={true}>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute isPrivate={true}>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
