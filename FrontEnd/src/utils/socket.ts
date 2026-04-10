import { io, Socket } from "socket.io-client";

export const socket: Socket = io("https://authentication-typescript.onrender.com", {
  autoConnect: false,
  withCredentials: true,
});