import React from "react";

function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <div className="row">
          <div className="col-md-6">
            <div className="header">
              <h1>SpeechCraft</h1>
              <p>A versatile language learning platform</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="login-form">
              <input
                type="email"
                className="form-control"
                placeholder="Email address or phone number"
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <button type="submit" className="btn btn-primary">
                Log in
              </button>

              <a href="#">Forgotten password?</a>
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#53CE2B", color: "white" }}
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
