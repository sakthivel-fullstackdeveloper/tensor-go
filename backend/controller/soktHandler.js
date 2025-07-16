const Message = require("../models/message");

const soktHandler =  (io)=> {
  io.on("connection",
     (socket) => { console.log("New client connected:", socket.id);

    socket.on("join-room", 
      async ({ roomId, username }) => {
      socket.join(roomId);
      console.log(`${username} joined ${roomId}`);

      try {
        const history = await Message.find({ roomId }).sort({ createdAt: 1 });
        socket.emit("chat-history", history);
      } catch (err) {
        console.error("Error fetching chat history:", err.message);
      }
    });

    socket.on("chat-message", async ({ roomId, sender, text }) => {
      try {
        const newMsg = new Message({ roomId, sender, text });
        await newMsg.save();

        io.to(roomId).emit("chat-message", newMsg);
      } catch (err) {
        console.error("Error saving message:", err.message);
      }
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
      console.log(`${socket.id} leftI ${roomId}`);
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
module.exports = { soktHandler };