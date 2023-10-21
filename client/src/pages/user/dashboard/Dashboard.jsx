import React from "react";
import Card from "../../../components/Card";

function Dashboard() {
  return (
    <div className="p-2">
      {/* First Section */}
      <h2 className="text-2xl font-semibold text-center my-6">Learning</h2>
      <div className="flex space-x-36 justify-center">
        <Card name="Alphabets" color="red" link="/example-1" />
        <Card name="Words" color="blue" link="/example-1" />
        <Card name="Sentence" color="green" link="/example-1" />
      </div>

      {/* Divider Line */}
      <div className="border-b border-black border-4 my-6" />

      {/* Second Section */}
      <h2 className="text-2xl font-semibold text-center my-6"> Practise</h2>
      <div className="flex space-x-36 justify-center">
        <Card name="Flash Card" color="green" link="/example-1" />
        <Card name="Challenge" color="red" link="/example-1" />
      </div>
    </div>
  );
}

export default Dashboard;
