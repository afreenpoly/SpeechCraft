import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

import Home from "./pages/homepage/Home";
import User from "./pages/user/User";

function App() {
  return (
    <div>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/*" element={<Home />}></Route>
          <Route path="/user/*" element={<User />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
