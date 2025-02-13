import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutsuccess } from "../app/users/userSlice";

export default function Profilesidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const urlParams = new URLSearchParams(location.search);
  const postslug = urlParams.get("postslug"); 

  useEffect(() => {
    const tabParam = urlParams.get("tab");
    setTab(tabParam || "profile"); 
  }, [location.search]);

  
  const handleSignOut = async () => {
    try {
      const res = await fetch("/server/user/signout", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        dispatch(signoutsuccess(data));
        navigate("/Signup");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div className="w-full md:w-64 md:h-full h-64 bg-gray-800 text-white flex flex-col">
      <nav className="flex-grow mt-4">
        <ul>
          <SidebarLink to="/Profile?tab=profile" icon="fas fa-user" label="Profile" active={tab === "profile"}>
            <span className="ml-auto bg-gray-600 text-xs px-2 py-1 rounded">
              {user.isAuth ? "Admin" : "User"}
            </span>
          </SidebarLink>
          {user.isAuth && (
            <>
              <SidebarLink to="/Profile?tab=post" icon="fas fa-file-alt" label="Posts" active={tab === "post"} />
              <SidebarLink to="/Profile?tab=user" icon="fa-solid fa-users" label="Users" active={tab === "user"} />
              <SidebarLink to={`/getregistration?postslug=${postslug || ""}`} icon="fa-solid fa-users" label="Registration" active={tab === "postslug"} />
            </>
          )}
          <li className="p-4 hover:bg-gray-700 flex items-center cursor-pointer" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt mr-3"></i>
            Sign Out
          </li>
        </ul>
      </nav>
    </div>
  );
}
const SidebarLink = ({ to, icon, label, active, children }) => (
  <li className={`p-4 flex items-center ${active ? "bg-gray-700" : "hover:bg-gray-700"}`}>
    <Link to={to} className="flex items-center w-full">
      <i className={`${icon} mr-3`}></i>
      {label}
      {children}
    </Link>
  </li>
);
