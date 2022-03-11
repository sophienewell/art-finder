import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { clearArts, clearUser } from "../redux/actions";
import useAPI from "../hooks/useAPI";
import { Navbar, Container } from "react-bootstrap";

function Menu({ activeUser, clearArts, clearUser }) {
  const { logout } = useAPI();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        {!activeUser && (
          <>
            <NavLink
              className={({ isActive }) =>
                (isActive ? "active" : "link") + "col-4"
              }
              to="login"
            >
              Login
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                (isActive ? "active" : "link") + "col-4"
              }
              to="signup"
            >
              Sign up
            </NavLink>
          </>
        )}
        {activeUser && (
          <>
            <NavLink
              className={({ isActive }) =>
                (isActive ? "active" : "link") + "col-4"
              }
              to="search"
            >
              Search
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                (isActive ? "active" : "link") + "col-4"
              }
              to="favorites"
            >
              Favorites
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                (isActive ? "active" : "link") + "col-4"
              }
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
      </Container>
    </Navbar>
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
