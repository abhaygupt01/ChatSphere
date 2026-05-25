import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(res.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (
    <div className="bg-black min-h-screen">

      <Navbar />

      <div className="flex items-center justify-center h-[85vh]">

        <div className="bg-gray-900 p-10 rounded-2xl w-[400px] shadow-2xl">

          <h1 className="text-white text-4xl font-bold text-center mb-8">
            Login 
          </h1>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-5"
          >

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-lg bg-gray-800 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 rounded-lg bg-gray-800 text-white outline-none"
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg transition"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;