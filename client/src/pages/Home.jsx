import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import robotstu from "../asset/robotstu.webp";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/server/postrouter/getpost?limit=3`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row md:flex-row justify-between items-center w-full h-full container">
        <p className="pl-5 ml-10 text-left m-4 text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-gray-700 max-w-lg">
          Empower your future with knowledge.
          <span className="text-red-400"> Start learning today</span>, and
          unlock endless possibilities tomorrow.
        </p>
        <div className="w-full lg:w-auto flex justify-center mt-4 md:flex md:justify-end   lg:justify-end md:w-auto">
          <img
            src={robotstu}
            alt="robotstudy"
            className="w-100 sm:w-2/3 lg:w-96 md:w-96 p-4 mt-8 lg:mt-0 md:mt-0 py-8 rounded-md shadow-lg border border-gray-200"
          />
        </div>
      </div>
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-center  text-gray-700 mb-6">
          Featured Courses
        </h2>

        {loading ? (
          <div className="text-center">Loading courses...</div>
        ) : error ? (
          <div className="text-center text-red-500 ">
            Failed to load courses.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                to={`/course/${post.slug}`}
                key={post._id}
                className="bg-white shadow-md rounded-lg p-3 hover:shadow-lg transition transform hover:scale-105 duration-300"
              >
                <div className="w-full flex justify-center">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 sm:h-32 lg:h-36 object-contain rounded-md"
                  />
                </div>
                <div className="mt-2 text-center">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-gray-600 text-sm">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-6">
          <Link
            to="/course"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition"
          >
            View All Courses
          </Link>
        </div>
      </section>
    </>
  );
}
