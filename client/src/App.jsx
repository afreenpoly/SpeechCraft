import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

import User from "./pages/user/User";
// import Logout from "./components/Logout";
import Home from "./pages/homepage/Home";
import Register from "./pages/homepage/register/Register";
// import Check from "./components/Check";

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* <Route index element={<Check />}></Route> */}
        <Route index element={<Home />}></Route>
        {/* <Route path="/logout" element={<Logout />}></Route> */}
        <Route path="/login" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <Route path="/*" element={<Check />}></Route> */}
        <Route path="/user/:user_id/*" element={<User />}></Route>
        {/* <Route
            path="/user/*"
            element={
              <Check>
                <User />
              </Check>
            }
          ></Route> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
