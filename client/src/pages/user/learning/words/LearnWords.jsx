import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const LearnWords = () => {
  const [wordPair, setWordPair] = useState({});
  const { user_id, language } = useParams();

  /**
   * This function fetches word pair.
   * @param {string} status status indicates which word pair to fetch., status = 0 means fetch word pair from current index, status = 1 means fetch word pair from next index, status = -1 means fetch word pair from previous index
   */
  const fetchWordPair = async (user_id, language, status) => {
    try {
      await axios
        .post("/getWordPair", { user_id, language, status })
        .then((response) => response.data)
        .then((data) => {
          if (data.wordPair) {
            setWordPair(data.wordPair);
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWordPair(user_id, language, 0);
  }, [user_id, language]);

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-semibold my-4">{language} Word</h1>
          <div className="bg-blue-600 h-44 w-44 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out flex flex-col justify-center items-center">
            {wordPair.newWord}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-semibold my-4">Known Word</h1>
          <div className="bg-blue-600 h-44 w-44 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out flex flex-col justify-center items-center">
            {wordPair.knownWord}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          fetchWordPair(user_id, language, 1);
        }}
        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default LearnWords;
