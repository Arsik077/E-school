import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./Navbar";

function Auth(props) {
  const context = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submit = (event) => {
    const data = { email: email, password: password };
    auth(data);
    event.preventDefault();
  };

  async function auth(data) {
    const response = await fetch("http://localhost:8000/api/authorization", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      let User = await response.json();
      localStorage.setItem("email", User.email);
      localStorage.setItem("password", password);
      localStorage.setItem("isOnline", true);
      context.setUser(User);
    } else {
      console.log("404 USER NOT FOUND");
    }
  }

  return (
    <div className="row mt-5">
      <div className="container">
        <div className="col-4 offset-4">
          <center>
            <h2 className="mb-3">Authorization</h2>
          </center>
          <div class="card">
            <div class="card-body">
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email..."
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password..."
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Sing In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
