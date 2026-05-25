import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    console.log("Button Clicked ");

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log(res.data);

      alert("Signup Successful ");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Signup Failed ❌");

    }

  };

  return (

    <div className="bg-black min-h-screen flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-2xl w-[400px] shadow-2xl">

        <h1 className="text-white text-5xl font-bold text-center mb-8">
          Signup 
        </h1>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 rounded-lg bg-zinc-800 text-white outline-none"
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-lg bg-zinc-800 text-white outline-none"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-lg bg-zinc-800 text-white outline-none"
            required
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg text-lg font-semibold transition"
          >

            Signup

          </button>

        </form>

      </div>

    </div>

  );

}

export default Signup;