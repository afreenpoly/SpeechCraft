import React from "react";

const SpinningCard = ({ frontContent, backContent, spin }) => {
  return (
    <div className="w-60 h-60 relative transform transition-transform duration-500">
      <div></div>
      <div className="group h-full w-full [perspective:1000px]">
        <div
          className={`relative h-full w-full border border-6 rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
            spin ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 text-center bg-lime-400 rounded-xl">
            <div className="min-h-full flex justify-center text-center items-center">
              <h1 className="text-3xl font-bold">{frontContent}</h1>
            </div>
          </div>
          {spin && (
            <div className="absolute inset-0  h-full w-full rounded-xl bg-cyan-500 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className=" min-h-full flex justify-center text-center items-center ">
                <h1 className="text-3xl font-bold">{backContent}</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpinningCard;
