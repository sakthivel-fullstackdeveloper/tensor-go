const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");
const { videoStream } = require("./controller/vedio"); 
const { soktHandler } = require("./controller/soktHandler"); 
const Message = require("./models/message");
const router = require("./routes/router");
require("dotenv").config();

try
{mongoose.connect(`${process.env.MONGO_URI}`);}
catch (error) {
  console.error("mongo connection eror:", error);
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });
videoStream(io);
soktHandler(io);

app.get("/", (req, res) =>res.send("<h1> hello from chat backend </h1>"));
app.use("/", router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(` Server run  ${PORT}`));
