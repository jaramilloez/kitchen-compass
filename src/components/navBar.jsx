import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
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
              <ul className="navbar-nav fs-6">
                <li className="nav-item mx-sm-1">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control"
                  />
                </li>
                <li className="nav-item ms-sm-2">
                  <Link to="/sign-up" className="linkLine nav-link">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item ms-sm-2">
                  <Link to="/log-in" className="linkLine nav-link">
                    Log In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Outlet />
      </React.Fragment>
    );
  }
}

export default NavBar;
