import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { api } from "../utils/api";

const Appbar = () => {
  const navigate = useNavigate(); //navigate to other page
  const username = localStorage.getItem("username"); //retrieve username from localStorage

  return (
    <div className="bg-gray-800 text-white flex justify-between px-10 py-4">
      <Link to={"/blogs"}>
        <h1 className="font-black text-2xl">Blog-Web</h1>
      </Link>
      <div className="w-64 flex justify-between items-center">
        <Link to={"/createBlog"}>
          <button
            type="button"
            className=" text-white bg-[#2ec27d] hover:bg-[#2ec27d]/60 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 transition duration-300"
          >
            Create
          </button>
        </Link>
        <div className="flex items-center">
          <Avatar username={username || "anonymous"} />
          <button
            type="button"
            className=" bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition duration-300"
            onClick={async () => {
              await api.post("/auth/logout")
              navigate("/signin");
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
