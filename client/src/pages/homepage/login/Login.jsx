import React from "react";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/user");
  };

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-transparent text-black p-4 rounded-lg">
            <h1 className="text-blue-500 text-4xl font-extrabold">
              SpeechCraft
            </h1>
            <p className="mt-4">A versatile language learning platform</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow-md justify-center justify-items-center text-center"
          >
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-400"
              placeholder="Email address or phone number"
            />
            <input
              type="password"
              className="w-full mt-3 px-3 py-2 border rounded-md focus:ring focus:ring-blue-400"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-full mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Log in
            </button>
            <a href="/" className="mt-2 block text-blue-500 hover:underline">
              Forgotten password?
            </a>
            <button
              onClick={handleClick}
              type="button"
              className="w-full mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
            >
              Create new account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
