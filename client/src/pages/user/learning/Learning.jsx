import React from "react";
import { Route, Routes } from "react-router-dom";
import LearnAlphabet from "../learning/alphabets/LearnAlphabet";
import LearnWords from "../learning/words/LearnWords";

function Learning() {
  return (
    <Routes>
      <Route path="/alphabets/*" element={<LearnAlphabet />}></Route>
      <Route path="/words/*" element={<LearnWords />}></Route>
    </Routes>
  );
}

export default Learning;
