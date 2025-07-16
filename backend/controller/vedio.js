const mongoose = require("mongoose");
const VideoFrame = require("../models/Vedio");

const videoStream = (io) => {
  io.on("connection", (socket) => {
    console.log(`Video client connected: ${socket.id}`);

    socket.on("join-video-room", async (roomId) => {
      socket.join(roomId);
      console.log(`${socket.id} joined video room ${roomId}`);

      const frames = await VideoFrame.find({ roomId }).sort({ createdAt: 1 });
      socket.emit("video-history", frames);

      const interval = setInterval(async () => {
        const fakeFrame = `Frame-${Math.floor(Math.random() * 1000)}`;
        const frameDoc = new VideoFrame({
          roomId,
          sender: socket.id,
          frameData: fakeFrame,
        });
        await frameDoc.save();

        io.to(roomId).emit("video-frame", frameDoc);
      }, 1000);

      socket.on("leave-video-room", () => {
        console.log(`${socket.id} left video room ${roomId}`);
        clearInterval(interval);
        socket.leave(roomId);
      });

      socket.on("disconnect", () => {
        console.log(`Video client disconnected: ${socket.id}`);
        clearInterval(interval);
      });
    });
  });
};

module.exports = { videoStream };
