import React from "react";
import { Route, Routes } from "react-router-dom";
import FlashCard from "../challenges/flashcard/FlashCard";
import Multiplayer from "../challenges/multiplayer/Multiplayer";

const Challenges = () => {
  return (
    <Routes>
      <Route path="/flashCard/*" element={<FlashCard />}></Route>
      <Route path="/multiplayer/*" element={<Multiplayer />}></Route>
    </Routes>
  );
};

export default Challenges;
