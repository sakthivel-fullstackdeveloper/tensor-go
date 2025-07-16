import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name before joining!");
      return;
    }
    if (!roomId.trim()) {
      alert(" Please enter a Room ID!");
      return;
    }
    navigate(`/room/${roomId}/${name}`);
  };

  const createRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name before creating a room!");
      return;
    }
    const newRoomId = `room-${Math.floor(1000 + Math.random() * 9000)}`;
    navigate(`/room/${newRoomId}/${name}`);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6"> Join or Create Room</h1>

        <input
          className="w-full p-3 rounded-lg mb-3 bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg mb-4 bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter room ID (if joining)"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <div className="space-y-3">
          <button
            onClick={joinRoom}
            className="w-full py-3 rounded-lg font-semibold text-black bg-blue-500 hover:bg-blue-600 transition"
          >
             Join Room
          </button>

          <button
            onClick={createRoom}
            className="w-full py-3 rounded-lg font-semibold text-black bg-green-500 hover:bg-green-600 transition"
          >
            Create New Room
          </button>
        </div>
      </div>
    </div>
  );
}
