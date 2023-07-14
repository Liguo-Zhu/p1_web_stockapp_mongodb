import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../images/logo.png";
import Finnhub from "../api/Finnhub";

// === navigation page
export default function Navigation({ currentUser }) {
  const { userInfo, watchList } = useContext(UserContext);

  const updateData = async (username, watchlist) => {
    try {
      await Finnhub.post("http://localhost:8080/update/watchlist", {
        username: username,
        watchlist: watchlist,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = () => {
    localStorage.removeItem("@stockAppUser");
    localStorage.removeItem("@watchListStorage");
    updateData(userInfo.username, watchList.toString());
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md" className="sticky-top">
        <Container fluid>
          <Navbar.Brand className="navbar-brand">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {"  QUT STOCKS "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {currentUser && (
                <NavLink
                  to={"/"}
                  className="nav-link "
                  style={({ isActive }) => ({
                    color: isActive ? "#000" : "#fff",
                    background: isActive ? "#f0f0f0" : "",
                  })}
                >
                  Home
                </NavLink>
              )}
              {currentUser && (
                <NavLink
                  reloadDocument // Each time you enter this page, it will reload
                  to={"/stock"}
                  className="nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? "#000" : "#fff",
                    background: isActive ? "#f0f0f0" : "",
                  })}
                >
                  Stock
                </NavLink>
              )}
              {currentUser ? (
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              ) : (
                <>
                  <NavLink
                    to={"/login"}
                    className="nav-link"
                    style={({ isActive }) => ({
                      color: isActive ? "#000" : "#fff",
                      background: isActive ? "#f0f0f0" : "",
                    })}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/signup"}
                    className="nav-link"
                    style={({ isActive }) => ({
                      color: isActive ? "#000" : "#fff",
                      background: isActive ? "#f0f0f0" : "",
                    })}
                  >
                    SignUp
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {currentUser && (
            <span className="text-white me-5">
              user name: {userInfo ? userInfo.username : null}
            </span>
          )}
        </Container>
      </Navbar>
    </>
  );
}
