import React from "react";
import { Route, Routes } from "react-router-dom";
import Challenges from "./challenges/Challenges";
import Dashboard from "./dashboard/Dashboard";

function User() {
  return (
    <Routes>
      <Route index element={<Dashboard />}></Route>
      <Route path="/*" element={<Dashboard />}></Route>
      <Route path="/challenges" element={<Challenges />}></Route>
    </Routes>
  );
}

export default User;
