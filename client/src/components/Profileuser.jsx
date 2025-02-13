import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircleAlert } from "lucide-react";
import { FaCheck, FaTimes } from "react-icons/fa";
export default function Profileuser() {
  const { user } = useSelector((state) => state.user);
  const [users, setuser] = useState([]);
  const [showmore, setshowmore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdDelete, setuserIdToDelete] = useState("");
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await fetch("/server/user/getuser");
        const data = await res.json();
        if (res.ok) {
          setuser(data.userlist || []);
          if (data.userlist.length < 9) {
            setshowmore(false);
          }
        }
      } catch (error) {
        console.log("Fetch Error:", error.message);
      }
    };

    if (user?.isAuth) {
      getuser();
    }
  }, [user?._id, user?.isAuth]);
  const handlesubmitemore = async () => {
    const startinit = users.length;
    try {
      const res = await fetch(`/server/user/getuser/initindex=${startinit}`);
      const data = await res.json();

      if (res.ok) {
        setuser((prev) => [...prev, ...data.userlist]);
        if (data.userlist.length < 9) {
          setShowModal(false);
        }
      }
    } catch (error) {
      console.log(error.message);
      setShowModal(false);
    }
  };
  const handledeleteuser = async () => {
    try {
      const res = await fetch(`/server/user/delete/${userIdDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setuser((prev) => prev.filter((user) => user._id !== userIdDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full">
      {user?.isAuth && users.length > 0 ? (
        <div className=" p-3 w-full  md:px-20  overflow-x-auto md:overflow-hidden h-[400px] md:h-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          <table className="md:w-full px-6  bg-white border border-gray-200 shadow-md rounded-lg md:mx-auto">
            <thead className="bg-gray-800 w-full text-white">
              <tr>
                <th className="py-6 px-6 text-left">Date Updated</th>
                <th colSpan="2" className="py-6 px-6 text-left">
                  User Image
                </th>
                <th className="py-6 px-6 text-left">User Name</th>
                <th className="py-6 px-6 text-left">Email</th>
                <th className="py-6 px-6 text-left">Admin</th>
                <th className="py-6 px-6 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index} className="border-t">
                  <td className="py-3 px-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td colSpan="2" className="py-3 px-4">
                    <img
                      src={user.profilephoto}
                      alt="photo"
                      className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
                    />
                  </td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    {user.isAuth ? (
                      <FaCheck className="text-green-700" />
                    ) : (
                      <FaTimes className="text-red-600" />
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setuserIdToDelete(user._id);
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
        <p>You have no user yet!</p>
      )}
      {showModal && (
        <div className="fixed inset-1 flex items-center justify-center  bg-opacity-60 ">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
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
                onClick={handledeleteuser}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
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
