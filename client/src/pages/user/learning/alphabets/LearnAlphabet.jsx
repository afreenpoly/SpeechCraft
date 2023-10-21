import React, { useState } from "react";
import Card from "../../../../components/Card";
import Popup from "../../../../components/Popup";

const LearnAlphabet = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState([]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption([...selectedOption, option]); // Add the selected option to the array
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Learn Alphabet</h1>
      {isPopupOpen && (
        <Popup onClose={closePopup} onSelectOption={handleOptionSelect} />
      )}
      {selectedOption.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {selectedOption.map((option, index) => (
            <Card name={option} color="green" link="/user" />
          ))}
        </div>
      )}
      <button
        onClick={openPopup}
        className="bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-700 absolute bottom-10 right-10"
      >
        +
      </button>
    </div>
  );
};

export default LearnAlphabet;
