import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/homepage/Home";
import User from "./pages/user/User";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" index element={<Home />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
