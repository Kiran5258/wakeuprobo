import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CourseList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("all");

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

  const filteredPosts =
    category === "all" ? posts : posts.filter((post) => post.category === category);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Courses</h1>

      <div className="mb-4 flex justify-center">
        <select
          className="border rounded-lg p-2 cursor-pointer text-gray-700 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all" className="cursor-pointer">All Categories</option>
          <option value="technical" className="cursor-pointer">Technical</option>
          <option value="non-technical" className="cursor-pointer">Non-Technical</option>
        </select>
      </div>
      {filteredPosts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg font-semibold mt-10">
          Soon will be added!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
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

              <div className="mt-3 text-center bg-gray-100 p-2 rounded-md shadow">
                <span className="text-lg font-bold text-blue-600">Rs.{post.price}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
