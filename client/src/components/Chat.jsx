import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat({ selectedUser }) {

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Logged in user
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const senderId = currentUser._id;
  const receiverId = selectedUser._id;

  // Fetch messages
  const fetchMessages = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/messages/${senderId}/${receiverId}`
      );

      setMessages(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Send message
  const sendMessage = async () => {

    if (!text.trim()) return;

    try {

      const res = await axios.post(
        "http://localhost:5000/api/messages/send",
        {
          sender: senderId,
          receiver: receiverId,
          text,
        }
      );

      socket.emit("send_message", res.data);

      setMessages((prev) => [...prev, res.data]);

      setText("");

    } catch (error) {

      console.log(error);

    }

  };

  // Fetch old messages
  useEffect(() => {

    fetchMessages();

  }, [selectedUser]);

  // Real-time receive
  useEffect(() => {

    socket.on("receive_message", (newMessage) => {

      setMessages((prev) => [...prev, newMessage]);

    });

    return () => socket.off("receive_message");

  }, []);

  return (

    <div className="w-full max-w-3xl bg-zinc-900 rounded-2xl shadow-2xl p-5">

      <h1 className="text-2xl font-bold mb-5 text-green-400">
        {selectedUser.name} 
      </h1>

      <div className="h-[500px] overflow-y-auto bg-zinc-800 rounded-xl p-4 space-y-3">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-2xl ${
              msg.sender === senderId
                ? "bg-green-500 ml-auto text-black"
                : "bg-zinc-700"
            }`}
          >

            {msg.text}

          </div>

        ))}

      </div>

      <div className="flex gap-3 mt-5">

        <input
          type="text"
          placeholder="Enter message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-zinc-800 outline-none border border-zinc-700"
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold text-black"
        >

          Send

        </button>

      </div>

    </div>

  );

}

export default Chat;