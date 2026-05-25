import { useEffect, useState } from "react";
import axios from "axios";

function Sidebar({ setSelectedUser }) {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/users"
        );

        setUsers(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchUsers();

  }, []);

  return (

    <div className="w-[300px] bg-zinc-900 h-screen p-4 border-r border-zinc-800">

      <h1 className="text-2xl font-bold text-green-400 mb-5">
        Chats 
      </h1>

      <div className="space-y-3">

        {users.map((user) => (

          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl cursor-pointer transition"
          >

            <h2 className="text-white font-semibold">
              {user.name}
            </h2>

            <p className="text-zinc-400 text-sm">
              {user.email}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Sidebar;