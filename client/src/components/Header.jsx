import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutsuccess } from "../app/users/userSlice";

import { Link } from "react-router-dom";
export default function Header() {
  useEffect(() => {
    const btn = document.getElementById("hamburger-btn");
    const menu = document.getElementById("menu");

    function Toggle() {
      btn.classList.toggle("open");
      menu.classList.toggle("flex");
      menu.classList.toggle("hidden");
    }

    btn.addEventListener("click", Toggle);
    return () => {
      btn.removeEventListener("click", Toggle);
    };
  }, []);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handlesignout = async () => {
    try {
      const res = await fetch("/server/user/signout", {
        method: "POST",
      });
      const data = res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutsuccess(data));
        Navigate("/Signup");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-6">
        <div className="flex items-center space-x-2">
          <h1 className="z-30  border-4 p-2  text-white text-2xl font-bold tracking-wide hover:text-blue-400 transition duration-300 hover:curse-pointer">
            WakeUpRobo
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <ul className="hidden md:flex space-x-8 text-white text-lg">
            <li>
              <a
                href="/"
                className="hover:text-blue-400 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/course"
                className="hover:text-blue-400 transition duration-300"
              >
                Course
              </a>
            </li>
            <li>
              <a
                href="/Blog"
                className="hover:text-blue-400 transition duration-300"
              >
                Blog
              </a>
            </li>
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
              <button className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300">
                <a href="/Signup">Login</a>
              </button>
            )}
            {isOpen && user && (
              <div className="absolute right-0 mt-2 w-56 bg-white  rounded-lg shadow-lg z-10">
                <div className="p-4 flex items-center space-x-3">
                  <div className="flex flex-col">
                    <p className="font-semibold ">{user.name}</p>
                    <p className="text-sm ">{user.email}</p>
                  </div>
                </div>
                <div>
                  <Link to="/profile">
                    <button className="w-full text-left px-4 py-2   hover:bg-gray-100 transition font-semibold cursor-pointer">
                      <i className="fas fa-user mr-3"></i>
                      Profile
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/mycourse">
                    <button className="w-full text-left px-4 py-2   hover:bg-gray-100 transition font-semibold cursor-pointer">
                      <i className="fa fa-book mr-3"></i>
                      My Course
                    </button>
                  </Link>
                </div>
                <div>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-b-lg transition font-semibold"
                    onClick={handlesignout}
                  >
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>{" "}
          <button
            id="hamburger-btn"
            className="z-20 block md:hidden focus:outline-none btn cursor-pointer"
          >
            <span className="hamburger-top "></span>
            <span className="hamburger-middle "></span>
            <span className="hamburger-bottom "></span>
          </button>
        </div>
      </div>
      <div
        id="menu"
        className="hidden fixed inset-0 flex-col item-center self-end w-full space-y-4 px-6 pt-28 pb-8 min-h-screen text-slate-50 uppercase divide-y divide-gray-400 bg-violet-500 duration-300"
      >
        <div className="pt-3 w-full text-center">
          <a className=" block tracking-wide hover:text-blue-400 " href="/">
            Home
          </a>
        </div>
        <div className="pt-3 w-full text-center">
          <a
            className=" block tracking-wide hover:text-blue-400 "
            href="/Course"
          >
            Course
          </a>
        </div>
        <div className="pt-3 w-full text-center">
          <a className=" block tracking-wide hover:text-blue-400 " href="/Blog">
            Blog
          </a>
        </div>
      </div>
    </nav>
  );
}
