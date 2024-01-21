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
    <div>
      <h2>Challenges</h2>

      <div>
        <h3>Friend Requests</h3>
        {friendRequests.length === 0 ? (
          <p>No friend requests</p>
        ) : (
          friendRequests.map((request) => (
            <div key={request.user_id}>
              <p>{request.user_id} sent you a friend request</p>
              <button onClick={() => acceptFriendRequest(request.user_id)}>
                Accept
              </button>
            </div>
          ))
        )}
      </div>

      <div>
        <h3>Send Friend Request</h3>
        <label>
          Friend's User ID:
          <input
            type="text"
            value={friendUserId}
            onChange={(e) => setFriendUserId(e.target.value)}
          />
        </label>
        <button onClick={sendFriendRequest}>Send Friend Request</button>
      </div>
    </div>
  );
};

export default Friends;
