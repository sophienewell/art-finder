import React, { useEffect } from "react";
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
import { connect } from "react-redux";
import { setFavorites } from "./redux/actions";
import useAPI from "./hooks/useAPI";

function App({ setFavorites, user }) {
  const { favesByUserID } = useAPI();
  useEffect(() => {
    async function getFaves() {
      if (user) {
        const json = await favesByUserID(user.id);
        if (json.success) {
          setFavorites(json.data);
        }
      }
    }
    getFaves();
  }, [user]);
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
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  setFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
