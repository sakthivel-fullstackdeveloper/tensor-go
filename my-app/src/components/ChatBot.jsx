import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://tensorbackend.fwitech.com/", {
  transports: ["websocket", "polling"],
});

const ChatBot = () => {
  const { roomId, username } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [remoteFrame, setRemoteFrame] = useState(null);

  const localVideoRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.connect();
    socket.emit("join-room", { roomId, username });
    socket.emit("join-video-room", roomId);

    socket.on("chat-history", (history) => setMessages(history));
    socket.on("chat-message", (msg) => setMessages((prev) => [...prev, msg]));
    socket.on("video-frame", (frame) => setRemoteFrame(frame));

    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    });

    return () => {
      socket.emit("leave-room", roomId);
      socket.emit("leave-video-room", roomId);
      socket.off("chat-history");
      socket.off("chat-message");
      socket.off("video-frame");
      socket.disconnect();
    };
  }, [roomId, username]);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = { roomId, sender: username, text: input };
    socket.emit("chat-message", msg);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
         Room: {roomId}
      </h1>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl mb-6">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="font-semibold mb-2">{username} (You)</h2>
          <video ref={localVideoRef} autoPlay muted className="w-full h-60 md:h-64 object-cover rounded" />
        </div>

       
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="font-semibold mb-2">Remote Stream</h2>
          {remoteFrame ? (
            <h1 className="w-full h-60 md:h-64 object-cover rounded">TURN/STUN server or external WebRTC signaling API</h1>
          ) : (
            <div className="w-full h-60 md:h-64 flex items-center justify-center text-gray-400">
              Waiting for others...
            </div>
          )}
        </div>
      </div>

      
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-bold mb-3 text-center"> Chat</h2>
        <div className="h-64 overflow-y-auto bg-gray-900 p-3 rounded mb-4 space-y-4">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">No messages yet</p>
          )}
          {messages.map((msg, i) => {
            const isMine = msg.sender === username;
            return (
              <div key={i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div className={`relative max-w-xs sm:max-w-sm px-4 py-2 rounded-lg shadow-md ${
                  isMine ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-700 text-gray-200 rounded-bl-none"
                }`}>
                  <span className="block text-xs opacity-70 mb-1">
                    {isMine ? "You" : msg.sender}
                  </span>
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 p-2 rounded bg-gray-700 focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
