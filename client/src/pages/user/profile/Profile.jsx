import React, { useState, useEffect } from "react";
import axios from "axios";

const Friends = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendUserId, setFriendUserId] = useState("");

  useEffect(() => {
    // Fetch friend requests when the component mounts
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const userId = "yourUserId"; // Replace with the actual user ID
      const response = await axios.post("/getUserInfo", {
        user_id: userId,
      });

      const user = response.data.user;
      if (user && user.friend_requests) {
        setFriendRequests(user.friend_requests);
      }
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const sendFriendRequest = async () => {
    try {
      const senderId = "yourUserId"; // Replace with the actual user ID
      const response = await axios.post("/sendFriendRequest", {
        sender_id: senderId,
        receiver_id: friendUserId,
      });

      alert(response.data.message);
      // Refresh friend requests after sending one
      fetchFriendRequests();
      setFriendUserId(""); // Clear the input field after sending request
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const acceptFriendRequest = async (friendId) => {
    try {
      const userId = "yourUserId"; // Replace with the actual user ID

      const response = await axios.post("/acceptFriendRequest", {
        sender_id: friendId,
        receiver_id: userId,
      });

      alert(response.data.message);
      // Refresh friend requests after accepting one
      fetchFriendRequests();
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Challenges</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Friend Requests</h3>
        {friendRequests.length === 0 ? (
          <p>No friend requests</p>
        ) : (
          friendRequests.map((request) => (
            <div key={request.user_id} className="mb-2">
              <p>{request.user_id} sent you a friend request</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => acceptFriendRequest(request.user_id)}
              >
                Accept
              </button>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Send Friend Request</h3>
        <label className="block mb-2">
          Friend's User ID:
          <input
            className="border border-gray-300 rounded px-4 py-2 w-full"
            type="text"
            value={friendUserId}
            onChange={(e) => setFriendUserId(e.target.value)}
          />
        </label>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={sendFriendRequest}
        >
          Send Friend Request
        </button>
      </div>
    </div>
  );
};

export default Friends;
