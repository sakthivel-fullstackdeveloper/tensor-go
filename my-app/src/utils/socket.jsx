import { io } from "socket.io-client";

// Change URL to your backend deployed URL
export const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  autoConnect: false,
});
