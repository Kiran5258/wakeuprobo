import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CourseList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/server/postrouter/getpost`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        setPosts(data.posts);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error fetching posts.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            to={`/course/${post.slug}`}
            key={post._id}
            className="bg-white shadow-md rounded-lg p-3 hover:shadow-lg transition transform hover:scale-105 duration-300"
          >
            <div className="w-full">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 sm:h-32 lg:h-36 object-cover rounded-md"
              />
            </div>
            <div className="mt-2">
              <h2 className="text-base sm:text-sm lg:text-lg font-semibold text-center">
                {post.title}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm text-center">
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
    </div>
  );
}
