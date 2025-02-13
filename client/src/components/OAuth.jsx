import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInsuccess } from "../app/users/userSlice";
import { useNavigate } from "react-router-dom";
export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlegoogleclick = async () => {
  const googleprovider = new GoogleAuthProvider();
  googleprovider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, googleprovider);
      const res = await fetch("server/auth/googleprovider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photourl: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInsuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="flex items-center justify-center bg-white text-gray-800 font-semibold py-2 px-4 rounded-full border-2 border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 w-full"
      onClick={handlegoogleclick}
    >
      <img
        src="./src/asset/google.png"
        alt="Google logo"
        className="w-5 h-5 mr-2"
      />
      Continue with Google
    </button>
  );
}
