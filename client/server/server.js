const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const { Server } = require("socket.io");

dotenv.config();


const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
let onlineUsers = {};

io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  // add user
  socket.on("add_user", (userId) => {

    onlineUsers[userId] = socket.id;

    io.emit("get_online_users", Object.keys(onlineUsers));

  });

  // send message
  socket.on("send_message", (data) => {

    io.emit("receive_message", data);

  });

  // disconnect
  socket.on("disconnect", () => {

    console.log("User Disconnected");

    onlineUsers = Object.fromEntries(
      Object.entries(onlineUsers).filter(
        ([key, value]) => value !== socket.id
      )
    );

    io.emit("get_online_users", Object.keys(onlineUsers));

  });

});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.log(err));

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});