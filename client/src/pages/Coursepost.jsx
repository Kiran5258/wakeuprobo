import React, { useState } from "react";
import { Link, useParams,useNavigate} from "react-router-dom";
import { useEffect } from "react";
import Comment from "../components/Comment";
import { useSelector } from "react-redux";

export default function Coursepost() {
  const { postslug } = useParams();
  const navigate=useNavigate('')
  const {user}=useSelector(state=>state.user)
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [post, setpost] = useState(null);
  useEffect(() => {
    if (!postslug) return;
    const getpost = async () => {
      try {
        setloading(true);
        const res = await fetch(`/server/postrouter/getpost?slug=${postslug}`);
        const data = await res.json();
        if (!res.ok) {
          seterror(true);
          setloading(false);
          return;
        }
        if (res.ok) {
          setpost(data.posts[0]);
          seterror(false);
          setloading(false);
        }
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    getpost();
  }, [postslug]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  const handleClick = () => {
    if (!user) {
      navigate("/Signup"); 
    } else {
      navigate(`/course/${postslug}/register`); 
    }
  };
  return (
    <main className="p-5 flex flex-col max-w-5xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-5xl">
        {post && post.title}
      </h1>
      <div className="w-full flex flex-col items-center justify-center">
        <img
          src={post?.image}
          alt={post?.title}
          className="mt-10 object-cover w-full max-w-2xl h-auto rounded-lg shadow-md border border-gray-200"
        />
      </div>

      <div className="flex justify-between w-full p-4 mx-auto max-w-2xl text-sm text-gray-600">
        {post && (
          <>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span>
              {new Date(post.createdAt).toLocaleString("en-US", {
                month: "long",
              })}
            </span>
          </>
        )}
      </div>
      <div
        className="max-w-2xl mx-auto w-full poststyle"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      <div className="flex justify-center">
      <button
        onClick={handleClick}
        className="px-5 py-2 w-40 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-center"
      >
        Registration
      </button>
    </div>
      <Comment postId={post?._id}/>
    </main>
  );
}
