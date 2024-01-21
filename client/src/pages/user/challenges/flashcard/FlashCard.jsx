import React, { useState, useEffect } from "react";
import SpinningCard from "../../../../components/SpinningCard";

const data = {
  Cat: "Chat",
  Dog: "Chien",
  House: "Maison",
  Car: "Voiture",
  Tree: "Arbre",
  Book: "Livre",
  Computer: "Ordinateur",
  Table: "Table",
  Chair: "Chaise",
  Sun: "Soleil",
  Moon: "Lune",
  Water: "Eau",
  Fire: "Feu",
  Food: "Nourriture",
  Friend: "Ami",
  Family: "Famille",
  Time: "Temps",
  Money: "Argent",
  Work: "Travail",
  Love: "Amour",
};

const FlashCard = () => {
  const words = Object.keys(data);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showFrenchTranslation, setShowFrenchTranslation] = useState(false);

  const englishWord = words[currentWordIndex];
  const frenchTranslation = data[englishWord];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFrenchTranslation(true);
    }, 5000); // 30 seconds

    return () => clearTimeout(timer);
  }, [currentWordIndex]);

  const nextWord = () => {
    if (currentWordIndex + 1 < words.length) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowFrenchTranslation(false);
    } else {
      // You can handle what happens when you finish all the words here.
      console.log("Practice completed.");
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-semibold my-4">
        {showFrenchTranslation ? "English Word" : "French Word"}
      </h1>
      <div className="text-2xl my-4 flex items-center justify-center">
        <SpinningCard
          frontContent={frenchTranslation}
          backContent={englishWord}
          spin={showFrenchTranslation}
        />
      </div>
      <button
        onClick={nextWord}
        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default FlashCard;
