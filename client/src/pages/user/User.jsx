import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Challenges from "./challenges/Challenges";
import Dashboard from "./dashboard/Dashboard";
import Learning from "./learning/Learning";
import Profile from "./profile/Profile";

function User() {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route index element={<Dashboard />}></Route>
          <Route path="/*" element={<Dashboard />}></Route>
          <Route path="/learning/*" element={<Learning />}></Route>
          <Route path="/challenges/*" element={<Challenges />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default User;
