import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import Chat from "../components/Chat";

const socket = io("http://localhost:5000");

function Home() {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Logged in user
  const currentUser = JSON.parse(localStorage.getItem("user"));

  console.log(currentUser);

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/login";

  };

  // Fetch all users
  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      // remove logged in user
      const filteredUsers = res.data.filter(
        (user) => user._id !== currentUser._id
      );

      setUsers(filteredUsers);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  // Online users
  useEffect(() => {

    if (currentUser) {

      socket.emit("add_user", currentUser._id);

    }

    socket.on("get_online_users", (users) => {

      setOnlineUsers(users);

    });

    return () => {

      socket.off("get_online_users");

    };

  }, []);

  return (

    <div className="flex h-screen bg-black text-white">

      {/* Sidebar */}
      <div className="w-[300px] bg-zinc-900 p-5 border-r border-zinc-800 flex flex-col">

        <div className="flex items-center justify-between mb-6">

          <h1 className="text-3xl font-bold text-green-400">
            Chats 
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Logout
          </button>

        </div>

        <div className="flex flex-col gap-3 overflow-y-auto">

          {users.map((user) => (

            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className="bg-zinc-800 p-4 rounded-xl cursor-pointer hover:bg-zinc-700 transition"
            >

              <h2 className="text-lg font-semibold">
                {user.name}
              </h2>

              <p className="text-sm text-zinc-400">
                {user.email}
              </p>

              <p
                className={`text-sm ${
                  onlineUsers.includes(user._id)
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >

                {onlineUsers.includes(user._id)
                  ? "Online 🟢"
                  : "Offline 🔴"}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Chat Area */}
      <div className="flex-1 flex items-center justify-center">

        {selectedUser ? (

          <Chat selectedUser={selectedUser} />

        ) : (

          <h1 className="text-3xl text-zinc-500">
            Select a user to chat 
          </h1>

        )}

      </div>

    </div>

  );

}

export default Home;