import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";

function Home() {
  return (
    <Routes>
      <Route index element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default Home;
