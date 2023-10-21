import React from "react";
import Card from "../../../components/Card";

function Dashboard() {
  return (
    <div className="pb-4">
      {/* First Section */}
      <h2 className="text-2xl font-semibold text-center mb-4">Learning</h2>
      <div className="flex space-x-36 justify-center">
        <Card name="Alphabets" color="red" link="/user/learning/alphabets" />
        <Card name="Words" color="blue" link="/user/learning/words" />
        <Card name="Sentences" color="green" link="/user/learning/sentences" />
      </div>

      {/* Divider Line */}
      <div className="border-b border-black border-4 my-6" />

      {/* Second Section */}
      <h2 className="text-2xl font-semibold text-center my-6"> Practise</h2>
      <div className="flex space-x-36 justify-center">
        <Card
          name="Flash Card"
          color="green"
          link="/user/challenges/flashCard"
        />
        <Card
          name="Multiplayer Mode"
          color="red"
          link="/user/challenges/multiplayer"
        />
      </div>
    </div>
  );
}

export default Dashboard;
