import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import config from "./config/serverConfig";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New User connedted:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});



server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});