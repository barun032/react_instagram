const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("share_post", (post) => {
        io.emit("recieve_post", post);
    });

    socket.on("send_likes", index => {
      io.emit("recieve_likes", index);
    });

    socket.on("send_comment", (comment, index) => {
      io.emit("recieve_comment", comment, index);
    })
})  

server.listen(3001, ()=>{
    console.log("Server is listing");
})