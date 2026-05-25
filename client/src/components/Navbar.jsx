import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-10 py-5 flex items-center justify-between shadow-lg">

      <h1 className="text-4xl font-bold text-blue-500">
        ChatSphere 
      </h1>

      <div className="flex items-center gap-6 text-lg">

        <Link
          to="/"
          className="hover:text-blue-400 transition"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="border border-blue-500 hover:bg-blue-500 px-5 py-2 rounded-lg transition"
        >
          Signup
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;