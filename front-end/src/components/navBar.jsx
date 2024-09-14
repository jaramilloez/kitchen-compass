import React from "react";
import { Link } from "react-router-dom";
import { logOut } from "../services/authService";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-sm mb-5">
      <div className="container-fluid px-3 px-sm-5">
        <Link to="/" className="navbar-brand fs-2 fw-bold">
          Kitchen Compass
        </Link>
        <button
          className="navbar-toggler fs-6 border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hamburger"
          aria-controls="hamburger"
          aria-expanded="false"
          aria-label="Hamburger menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          id="hamburger"
          className="collapse navbar-collapse text-end w-100 justify-content-end"
        >
          {!user && (
            <ul className="navbar-nav fs-6 text-nowrap">
              <li className="nav-item ms-sm-2">
                <Link to="/sign-up" className="underlineAnimation nav-link">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item ms-sm-2">
                <Link to="/log-in" className="underlineAnimation nav-link">
                  Log In
                </Link>
              </li>
            </ul>
          )}
          {user && (
            <ul className="navbar-nav fs-6 text-nowrap">
              <li className="underlineAnimation nav-item ms-sm-2">
                <Link to="/shopping-list" className="nav-link">
                  Shopping List
                </Link>
              </li>
              <li className="underlineAnimation nav-item ms-sm-2">
                <Link to="/new-recipe" className="nav-link">
                  New recipe
                </Link>
              </li>
              <li className="underlineAnimation nav-item ms-sm-2">
                <Link to="/group" className="nav-link">
                  Group
                </Link>
              </li>
              <li className="nav-item ms-sm-2">
                <button
                  onClick={() => {
                    logOut();
                    window.location = "/";
                  }}
                  className="btn btn-outline-dark py-1"
                >
                  Log Out
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
