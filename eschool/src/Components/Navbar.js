import React, { useState } from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "./Auth";
import Students from "./Students";

export const UserContext = React.createContext();

function Navbar(props) {
  const [user, setUser] = useState({
    id: 0,
    email: "",
    password: "",
    fullName: "",
  });

  function logout() {
    localStorage.removeItem("isOnline");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              E-school
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div class="d-flex">
              {localStorage.getItem("isOnline") ? (
                <a href="/" style={{ color: "white" }} onClick={() => logout()}>
                  Logout
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        </nav>
      </div>
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <Switch>
          <Route path="/">
            {localStorage.getItem("isOnline") ? <Students /> : <Auth />}
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default Navbar;
