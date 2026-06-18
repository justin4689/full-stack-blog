import { useState } from "react";
import Image from "./Image";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="/logo.png" alt="Justin Logo" w={100} h={100} />
        <span>JustinBlog</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <div className="cursor-pointer text-4xl" onClick={() => setOpen((prev) => !prev)}>
          <div className="flex flex-col gap-[5.4px]">
            <div className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${open && "rotate-45"}`}></div>
            <div className={`h-[3px] rounded-md w-6 bg-black transition-all ease-in-out ${open && "opacity-0"}`}></div>
            <div className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${open && "-rotate-45"}`}></div>
          </div>
        </div>
        <div className={`w-full h-screen bg-[#e6e6ff] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"}`}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/posts?sort=trending" onClick={() => setOpen(false)}>Trending</Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>Most Popular</Link>
          <Link to="/" onClick={() => setOpen(false)}>About</Link>
          {user ? (
            <button onClick={handleLogout} className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
            </Link>
          )}
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/posts?sort=trending">Trending</Link>
        <Link to="/posts?sort=popular">Most Popular</Link>
        <Link to="/">About</Link>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.username}</span>
            <button onClick={handleLogout} className="py-2 px-4 rounded-3xl bg-blue-800 text-white text-sm">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
