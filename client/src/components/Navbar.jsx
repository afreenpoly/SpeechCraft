import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Popover } from "antd";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user_id } = useParams();

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const content = (
    <div className="flex flex-col w-20 text-center space-y-3">
      <Link to={"/user/" + user_id + "/profile"}>Profile</Link>
      <Link to="/">Logout</Link>
    </div>
  );

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <Link to={"/user/" + user_id} className="text-white text-xl">
          Speech Craft
        </Link>

        <div className="relative">
          <Popover content={content}>
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center text-white focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                <UserOutlined />
              </div>
            </button>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
