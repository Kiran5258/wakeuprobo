import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Createpost() {
  const [filename, setfilename] = useState("No file chosen");
  const [file, setfile] = useState(null);
  const [formdata, setFormdata] = useState({
    title: "",
    content: "",
    category: "technical",
    price: "",
    image: "",
  });
  const [posterror, setposterror] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageprogress, setimageprogress] = useState(null);
  const navigate = useNavigate();
  const handleuploadimage = async (file) => {
    if (!file) {
      setImageFileUploadError("Please choose a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploadimage");

    setImageFileUploading(true);
    setimageprogress(0);
    setImageFileUploadError(null);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwbm7oyj5/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setimageprogress(percentCompleted);
          },
        }
      );
      setFormdata({ ...formdata, image: res.data.secure_url });
    } catch (error) {
      setImageFileUploadError("Upload failed. Please try again.");
    } finally {
      setImageFileUploading(false);
    }
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/server/postrouter/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata), 
      });

      const data = await res.json();
      if (!res.ok) {
        setposterror(data.message || "An error occurred.");
        return;
      }

      setposterror(null);
      navigate(`/course/${data.slug}`);
    } catch (error) {
      console.error("Error in submission:", error);
      setposterror("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen max-w-2xl p-6 self-center mx-auto">
      <h1 className="text-center text-2xl font-semibold my-6">Create a Post</h1>
      <form className="flex flex-col space-x-4" onSubmit={handlesubmit}>
        <div className="flex flex-col justify-between space-x-4 box-border mr-0">
          <div className="flex flex-col justify-between space-y-4 box-border mr-0">
            <input
              type="text"
              id="title"
              placeholder="Title"
              className="px-3 py-2 border mr-0 border-gray-300 rounded-md outline-none focus:ring-2 "
              required
              onChange={(e) =>
                setFormdata({ ...formdata, title: e.target.value })
              }
            />
            <select
              className="border rounded-lg p-2 text-gray-700 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormdata({ ...formdata, category: e.target.value })
              }
            >
              <option value="technical">Technical</option>
              <option value="non-technical">Non-Technical</option>
            </select>
          </div>

          <div className="px-3 py-2 flex my-3 items-center justify-between border-3 border-black border-dotted mr-0">
            <div className="my-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <span className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                  Choose File
                </span>
                <span className="text-gray-700">{filename}</span>
                <input
                  type="file"
                  accept="image/*"
                  id="file"
                  className="hidden"
                  onChange={(e) => {
                    setfilename(
                      e.target.files[0]
                        ? e.target.files[0].name
                        : "No file chosen"
                    );
                    setfile(e.target.files[0]);
                  }}
                />
              </label>
            </div>
            <button
              type="button"
              className="bg-black cursor-pointer text-white py-2 px-2 rounded-md"
              onClick={() => handleuploadimage(file)}
              disabled={imageFileUploading}
            >
              {imageFileUploading ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageprogress}
                    text={`${imageprogress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>
          {imageFileUploadError && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md mr-0 mb-3">
              {imageFileUploadError}
            </div>
          )}
          {formdata.image && (
            <img
              src={formdata.image}
              alt="upload"
              className="w-full h-64 object-cover"
            />
          )}
          <input
            type="text"
            id="price"
            name="price"
            className="border rounded-lg p-2 text-gray-700 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 space-y-4 mr-0 mb-4"
            placeholder="Enter price"
            onChange={(e) =>
              setFormdata({ ...formdata, price: e.target.value })
            }
          />
          <ReactQuill
            theme="snow"
            className="h-72"
            placeholder="writing..."
            onChange={(value) =>
              setFormdata((prev) => ({ ...prev, content: value || "" }))
            }
          />
        </div>
        <button className="mt-15 w-full py-2 rounded flex justify-center items-center gap-2 cursor-pointer text-white bg-blue-500 hover:bg-blue-600">
          Publish
        </button>
      </form>

      {posterror && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md mr-0 mb-3">
          {posterror}
        </div>
      )}
    </div>
  );
}
