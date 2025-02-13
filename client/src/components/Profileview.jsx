import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateinit,
  updatesuccess,
  updatefailure,
  deleteuser,
  deletesuccess,
  deletefailure,
  signoutsuccess,
} from "../app/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CircleAlert } from "lucide-react";
import axios from "axios";

export default function Profileview() {
  const { user, error } = useSelector((state) => state.user);
  const [updateusersuccess, setupdatesuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef(null);
  const [updateerror, seterror] = useState(null);
  const [formdata, setFormdata] = useState({});
  const dispatch = useDispatch();

  const handleimagechange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setImageFile(file);
      setUploadProgress(0);
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    if (!file) {
      setImageFileUploadError("No file available for upload");
      return;
    }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploadimage");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwbm7oyj5/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      setImageFileUrl(res.data.secure_url);
      setFormdata({ ...formdata, profilephoto: res.data.secure_url });
      setImageFileUploading(false);
    } catch (error) {
      setImageFileUploadError(
        "Could not upload image (File must be less than 2MB)"
      );
      setImageFileUploading(false);
    }
  };
  const handlechange = async (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    setupdatesuccess(null);
    seterror(null);
    if (Object.keys(formdata).length === 0) {
      seterror("No user changes");
      return;
    }
    if (imageFileUploading) {
      setImageFileUploadError("Image is uploading");
    }
    try {
      dispatch(updateinit());
      const res = await fetch(`/server/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(updatefailure(data.message));
        seterror("No changes");
      } else {
        dispatch(updatesuccess(data));
        setupdatesuccess("User changes successful");
      }
    } catch (error) {
      dispatch(updatefailure(error.message));
      seterror("No changes");
    }
  };

  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteuser());
      const res = await fetch(`/server/user/delete/${user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deletefailure(data.message));
      } else {
        dispatch(deletesuccess(data));
        Navigate("/Signup");
      }
    } catch (error) {
      dispatch(deletefailure("You cannot delete"));
    }
  };

  const handlesignout = async () => {
    try {
      const res = await fetch("/server/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        seterror(data.message);
      } else {
        dispatch(signoutsuccess(data));
        Navigate("/Signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="font-semibold my-7 text-3xl text-center">Profile</h1>
      <form onSubmit={handlesubmit} className="flex flex-col">
        <div className="w-32 h-32 self-center relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleimagechange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={imageFileUrl || user?.profilephoto}
              alt="user"
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploading ? "opacity-60" : ""
              }`}
            />
            {imageFileUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <CircularProgressbar
                  value={uploadProgress}
                  text={`${uploadProgress}%`}
                />
              </div>
            )}
          </div>
          {imageFileUploadError && (
            <p className="text-red-500 text-sm">{imageFileUploadError}</p>
          )}
        </div>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              placeholder="username"
              defaultValue={user.name}
              className="w-72 sm:w-96 md:w-full lg:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handlechange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              defaultValue={user.email}
              className="w-72 sm:w-96 md:w-full lg:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handlechange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="w-72 sm:w-96 md:w-full lg:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handlechange}
            />
          </div>
          <button className="w-full cursor-pointer py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Update
          </button>
          {user.isAuth && (
            <Link to={"/Createpost"}>
              <button
                type="submit"
                className="w-full mt-3 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create a Post
              </button>
            </Link>
          )}
          <div className="flex justify-between mt-4">
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => setShowModal(true)}
            >
              Delete Account
            </span>
            <span
              className="cursor-pointer text-blue-600"
              onClick={handlesignout}
            >
              Sign Out
            </span>
          </div>
          {updateusersuccess && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md">
              {updateusersuccess}
            </div>
          )}
          {updateerror && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md">
              {updateerror}
            </div>
          )}
        </div>
      </form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <div className="flex justify-center text-4xl text-red-500 mb-4">
              <CircleAlert size={40} />
            </div>
            <h2 className="text-lg font-semibold text-center mb-4">
              Are you sure you want to delete your account?
            </h2>
            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-4 mt-4 rounded-lg shadow-md">
          {error}
        </div>
      )}
    </div>
  );
}
