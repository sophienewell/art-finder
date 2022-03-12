import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import FavoritesPage from "./components/FavoritesPage";
import Menu from "./components/Menu";
import ProtectedRoute from "./components/ProtectedRoute";
import { connect } from "react-redux";
import { setFavorites, setUser } from "./redux/actions";
import useAPI from "./hooks/useAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App({ setFavorites, user, setUser }) {
  const { favesByUserId, verify } = useAPI();
  useEffect(() => {
    async function getFaves() {
      if (user) {
        const json = await favesByUserId();
        console.log(json);
        if (json.success) {
          setFavorites(json.data);
        }
      }
    }
    getFaves();
  }, [user]);

  useEffect(() => {
    async function checkUser() {
      const json = await verify();
      if (json.success) {
        setUser(json.data);
      }
    }
    checkUser();
  }, []);

  return (
    <div>
      <Router>
        <Menu />
        <Routes>
          <Route
            path="/signup"
            element={
              <ProtectedRoute isPrivate={false}>
                <SignUpPage />
              </ProtectedRoute>
            }
          />
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
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
