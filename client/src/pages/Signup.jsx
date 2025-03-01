import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [formdata, setform] = useState({});
  const [errormsg, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const Handlechange = (e) => {
    setform({ ...formdata, [e.target.id]: e.target.value });
  }
  const Handlesubmit = async (e) => {
    seterror(null)
    setloading(false)
    e.preventDefault();
    if (!formdata.name || !formdata.email || !formdata.password) {
      return seterror("please fill the all requirements");
    }
    try {
      setloading(true);
      seterror(null);
      const res = await fetch("/server/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        return seterror(data.message);
      }
      setloading(false);
      if (res.ok) {
        navigate("/Signin");
      }
    } catch (error) {
      seterror(error.message);
      setloading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen mt-20 ">
        <div className="flex flex-col justify-start items-center space-x-2">
          <h1 className=" p-2 text-2xl font-bold tracking-wide hover:text-blue-400 transition duration-300 hover:curse-pointer mx-8">
            WakeUpRobo
          </h1>
          <p>Signup to get more accurate and personalized information.</p>
        </div>
        <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-md my-10">
          <form className="space-y-4" onSubmit={Handlesubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                onChange={Handlechange}
                className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="example@gamil.com"
                id="email"
                onChange={Handlechange}
                className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={Handlechange}
                className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded flex justify-center items-center gap-2 cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span>Loading...</span>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-6">
            <p>
              Already you have a account? 
              <span className="text-blue-500">
                <a href="/Signin">signin</a>
              </span>
            </p>
          </div>
          {errormsg && (
            <div className="mt-5 text-red-500 bg-red-100 border border-red-400 rounded p-2">
              {errormsg}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
