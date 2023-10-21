// Popup.js

import React from "react";

const Popup = ({ onClose, onSelectOption }) => {
  const handleOptionClick = (option) => {
    onSelectOption(option);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
      <div className="bg-white p-4 rounded-lg z-50">
        <h2 className="text-lg font-semibold mb-4">Select an option:</h2>
        <ul>
          <li>
            <button
              onClick={() => handleOptionClick("English")}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              English
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOptionClick("Spanish")}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              Spanish
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOptionClick("French")}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              French
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Popup;
