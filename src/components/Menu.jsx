import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { clearArts, clearUser } from "../redux/actions";
import useAPI from "../hooks/useAPI";
import { Navbar, Container, Nav } from "react-bootstrap";

function Menu({ activeUser, clearArts, clearUser }) {
  const { logout } = useAPI();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <i className="bi bi-palette text-white"></i>
        <header className="segoe text-large text-white margin-20">
          Art Finder
        </header>
        <Nav className="margin-right">
          {!activeUser && (
            <>
              <NavLink
                className={({ isActive }) =>
                  (isActive ? "active" : "link") + " segoe"
                }
                to="login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  (isActive ? "active" : "link") + " segoe"
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
                  (isActive ? "active" : "link") + " segoe"
                }
                to="search"
              >
                Search
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  (isActive ? "active" : "link") + " segoe"
                }
                to="favorites"
              >
                Favorites
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  (isActive ? "active" : "link") + " segoe"
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
        </Nav>
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
