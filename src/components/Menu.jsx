import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

function Menu({ activeUser, children }) {
  console.log(children);
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
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
