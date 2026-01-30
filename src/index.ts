import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import config from "./config/serverConfig";
import roomHandler from "./handlers/roomHandler";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"],
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log("New User connected:", socket.id);
    // pass the socket to the room handler for managing room events i.e. createRoom and joinRoom
    roomHandler(socket);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
