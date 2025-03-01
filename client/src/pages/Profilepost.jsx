import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircleAlert } from "lucide-react";

export default function Profilepost() {
  const { user } = useSelector((state) => state.user);
  const [usepost, setpost] = useState([]);
  const [showmore, setshowmore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setpostIdToDelete] = useState("");
  useEffect(() => {
    const getpost = async () => {
      try {
        const res = await fetch(
          `/server/postrouter/getpost?userId=${user?._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setpost(data.posts || []);
          if (data.posts.length < 9) {
            setshowmore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (user?.isAuth) {
      getpost();
    }
  }, [user?._id, user?.isAuth]);
  const handlesubmitemore = async () => {
    const startinit = usepost.length;
    try {
      const res = await fetch(
        `/server/postrouter/getpost?userId=${user._id}&startIndex=${startinit}`
      );
      const data = await res.json();
      if (res.ok) {
        setpost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setshowmore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
      setshowmore(false);
    }
  };

  const handledeletepost = async () => {
    setShowModal(false);
    if (!postIdToDelete) return;
    try {
      const res = await fetch(
        `/server/postrouter/deletepost/${postIdToDelete}/${user._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setpost((prev) => prev.filter((post) => post._id !== postIdToDelete));
      } else {
        console.error("Failed to delete post:", data.message);
      }
    } catch (error) {
      console.log("Error deleting post:", error.message);
    }
  };

  return (
    <div className="w-full">
      {user?.isAuth && usepost.length > 0 ? (
        <div className=" p-3 w-100%  md:px-20  overflow-x-auto md:overflow-hidden h-[400px] md:h-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          <table className="md:w-full px-6  bg-white border border-gray-200 shadow-md rounded-lg md:mx-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-6 px-6 text-left">Date Updated</th>
                <th colSpan="2" className="py-6 px-6 text-left">
                  Post Image
                </th>
                <th className="py-6 px-6 text-left">Post Title</th>
                <th className="py-6 px-6 text-left">Category</th>
                <th className="py-6 px-6 text-left">Price</th>
                <th className="py-6 px-6 text-left">Edit</th>
                <th className="py-6 px-6 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {usepost.map((post, index) => (
                <tr key={post.id || index} className="border-t">
                  <td className="py-3 px-4">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td colSpan="2" className="py-3 px-4 w-40 h-30">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-20 h-20 object-cover rounded-md border border-gray-300 shadow-sm"
                    />
                  </td>
                  <td className="py-3 px-4">{post.price}</td>
                  <td className="py-3 px-4">{post.category}</td>
                  <td className="py-3 px-4">
                    <Link to={`/course/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/editpost/${post._id}`}
                      className="text-blue-500 hover:underline "
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setpostIdToDelete(post._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showmore && (
            <button
              onClick={handlesubmitemore}
              className="w-full text-blue-500 text-center text-sm cursor-pointer"
            >
              Show more
            </button>
          )}
        </div>
      ) : (
        <p>You have no posts yet!</p>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
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
                onClick={handledeletepost}
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
    </div>
  );
}
