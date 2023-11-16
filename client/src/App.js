import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

import User from "./pages/user/User";
import Check from "./pages/homepage/register/Check";
import Logout from "./pages/homepage/register/Logout";
import Home from "./pages/homepage/Home";
import Register from "./pages/homepage/register/Register";

function App() {
  return (
    <div>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route index element={<Check />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/login" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/*" element={<Check />}></Route>
          <Route
            path="/user/*"
            element={
              <Check>
                <User />
              </Check>
            }
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;