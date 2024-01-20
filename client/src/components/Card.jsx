import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ name, color, link }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(link);
  };

  return (
    <div
      className={`${color} h-44 w-44 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out flex flex-col justify-center items-center`}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <h2 className="text-lg font-semibold text-center">{name}</h2>
    </div>
  );
};

export default Card;
