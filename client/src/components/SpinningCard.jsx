import React from "react";

const SpinningCard = ({ Content }) => {
  return (
    <div
      className={`w-40 h-60 relative transform transition-transform duration-500`}
    >
      <div className="w-full h-full absolute flex justify-center items-center bg-red-500 text-white text-2xl font-semibold">
        {Content}
      </div>
    </div>
  );
};

export default SpinningCard;
