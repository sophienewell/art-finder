import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { clearArts, clearUser } from "../redux/actions";
import useAPI from "../hooks/useAPI";

function Menu({ activeUser, clearArts, clearUser }) {
  const { logout } = useAPI();
  return (
    <div className="nav">
      {!activeUser && (
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "link")}
          to="login"
        >
          Login
        </NavLink>
      )}
      {activeUser && (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "link")}
            to="search"
          >
            Search
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "link")}
            to="favorites"
          >
            Favorites
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "link")}
            to="login"
            onClick={async () => {
              await logout();
              clearArts();
              clearUser();
            }}
          >
            Logout
          </NavLink>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.user,
  };
};

const mapDispatchToProps = {
  clearArts,
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
