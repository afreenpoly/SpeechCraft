const SpinningCard = ({ frontContent, backContent, spin }) => {
  return (
    <div className="w-60 h-60 relative transform transition-transform duration-500">
      <div className="group h-full w-full [perspective:1000px]">
        <div
          className={`relative h-full w-full border-6 rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
            spin ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl">
            <h1 className="text-3xl font-bold text-white">{frontContent}</h1>
          </div>
          {spin && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="flex justify-center items-center h-full">
                <h1 className="text-3xl font-bold text-white">{backContent}</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpinningCard;
