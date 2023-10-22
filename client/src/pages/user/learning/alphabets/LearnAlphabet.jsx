import React, { useState } from "react";
import { Modal, FloatButton } from "antd";
import Card from "../../../../components/Card";
import { PlusCircleOutlined } from "@ant-design/icons";

const LearnAlphabet = () => {
  const [isModelOpen, setIsModelOpen] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const openModel = () => {
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions([...selectedOptions, option]); // Add the selected option to the array
    closeModel();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Learn Alphabet</h1>

      {selectedOptions.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {selectedOptions.map((option, index) => (
            <Card name={option} color="green" link="/user" />
          ))}
        </div>
      )}
      <Modal
        title="Select a Language:"
        open={isModelOpen}
        footer={null}
        onCancel={closeModel}
      >
        <div className="bg-white p-4 rounded-lg z-50">
          <ul>
            <li>
              <button
                onClick={() => handleOptionSelect("English")}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                English
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOptionSelect("Spanish")}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Spanish
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOptionSelect("French")}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                French
              </button>
            </li>
          </ul>
        </div>
      </Modal>
      <FloatButton icon={<PlusCircleOutlined />} onClick={openModel} />
    </div>
  );
};

export default LearnAlphabet;
