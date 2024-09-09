import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signUp";
import LogIn from "./components/logIn";
import Home from "./components/home";
import NavBar from "./components/navBar";
import "./index.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path="/log-in" element={<LogIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
