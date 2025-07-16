const mongoose = require("mongoose");
const VideoFrameSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true },
    sender: { type: String, required: true },
    frameData: { type: String, required: true }, 
  },
  { timestamps: true }
);

const VideoFrame = mongoose.model("VideoFrame", VideoFrameSchema);
module.exports = VideoFrame;