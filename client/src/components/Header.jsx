import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { signoutsuccess } from "../app/users/userSlice";
import logo from "../asset/wrblogo.png";

export default function Header() {
  useEffect(() => {
    const btn = document.getElementById("hamburger-btn");
    const menu = document.getElementById("menu");

    function toggleMenu() {
      btn.classList.toggle("open");
      menu.classList.toggle("flex");
      menu.classList.toggle("hidden");
    }

    btn.addEventListener("click", toggleMenu);
    return () => {
      btn.removeEventListener("click", toggleMenu);
    };
  }, []);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/server/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutsuccess(data));
        navigate("/Signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="shadow-lg  bg-white z-50">
      <div className="container mx-auto flex items-center justify-between py-6">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Website Logo"
            className="h-25 w-25 p-2 transition bg-cover rounded-full duration-300 transform hover:scale-110 cursor-pointer"
          />
          <h1 className="text-center text-3xl font-semibold">WakeupRobo</h1>
        </div>
        <div className="flex items-center space-x-6">
          <ul className="hidden md:flex space-x-8 text-lg">
            {["/", "/course", "/blog"].map((path, index) => (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold text-xl"
                      : "hover:text-gray-400 transition text-xl font-semibold duration-300"
                  }
                >
                  {path === "/"
                    ? "Home"
                    : path.charAt(1).toUpperCase() + path.slice(2)}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="relative inline-block text-left">
            {user ? (
              <div onClick={toggleDropdown} className="cursor-pointer">
                <img
                  src={user.profilephoto}
                  alt="Profile"
                  className="w-10 h-10 bg-white rounded-full border-2 border-gray-300 hover:border-gray-100 transition"
                />
              </div>
            ) : (
              <button className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                <NavLink to="/Signup">Login</NavLink>
              </button>
            )}
            {isOpen && user && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10">
                <div className="p-4 flex items-center space-x-3">
                  <div className="flex flex-col">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>
                <div>
                  <NavLink to="/profile">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition font-semibold cursor-pointer">
                      <i className="fas fa-user mr-3"></i>
                      Profile
                    </button>
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/mycourse">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition font-semibold cursor-pointer">
                      <i className="fa fa-book mr-3"></i>
                      My Course
                    </button>
                  </NavLink>
                </div>
                <div>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-b-lg transition font-semibold"
                    onClick={handleSignOut}
                  >
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            id="hamburger-btn"
            className="z-20 block md:hidden focus:outline-none btn cursor-pointer"
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </div>
      <div
        id="menu"
        className="hidden fixed inset-0 flex-col items-center self-end w-full space-y-4 px-6 pt-28 pb-8 min-h-screen text-slate-50 uppercase divide-y divide-gray-400 bg-violet-500 duration-300"
      >
        {["/", "/course", "/blog"].map((path, index) => (
          <div key={index} className="pt-3 w-full text-center">
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "block tracking-wide text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "block tracking-wide hover:text-blue-400"
              }
            >
              {path === "/"
                ? "Home"
                : path.charAt(1).toUpperCase() + path.slice(2)}
            </NavLink>
          </div>
        ))}
      </div>
    </nav>
  );
}
