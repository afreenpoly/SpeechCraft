import { useState, useEffect } from "react";
import SpinningCard from "../../../../components/SpinningCard";
import { useParams } from "react-router-dom";
import axios from "axios";

const FlashCard = () => {
  const [wordPair, setWordPair] = useState({});
  const [showKnownWord, setShowKnownWord] = useState(false);
  const [timer, setTimer] = useState(5); // Initial timer value
  const [timerActive, setTimerActive] = useState(true); // State to manage timer activation

  const { user_id, language } = useParams();

  const fetchFlashCardWordPair = async (user_id, language) => {
    try {
      await axios
        .post("/getFlashCardWordPair", { user_id, language })
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

  const nextWord = () => {
    fetchFlashCardWordPair(user_id, language);
    setShowKnownWord(false);
    setTimer(5); // Reset timer value when the button is clicked
    setTimerActive(true);
  };

  useEffect(() => {
    if (Object.keys(wordPair).length === 0) {
      fetchFlashCardWordPair(user_id, language);
    }
  }, [user_id, language, wordPair]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setTimerActive(false); // Stop the timer when it reaches zero
            clearInterval(interval); // Clear the interval
            setShowKnownWord(true);
            return prevTimer - 1; // Return 0 to stop further decrements
          } else {
            return prevTimer - 1; // Decrement timer if not zero yet
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-semibold my-4">
        {showKnownWord ? "Known Word" : language + " Word"}
      </h1>
      <div className="text-2xl my-4 flex items-center justify-center">
        <SpinningCard
          frontContent={wordPair.newWord}
          backContent={wordPair.knownWord}
          spin={showKnownWord}
        />
      </div>
      <button
        onClick={nextWord}
        disabled={!showKnownWord}
        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {showKnownWord ? "Next" : "Wait..."}
      </button>
      <p className="text-gray-600 my-2">
        {timerActive ? `Shows the known word in ${timer} seconds...` : ""}
      </p>
    </div>
  );
};

export default FlashCard;
