import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Registration() {
  const { postslug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    workcollegename: "",
    contactnumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!postslug) return;
    const getPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/server/postrouter/getpost?slug=${postslug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
        } else {
          setPostTitle(data.posts[0].title || "Unknown Title");
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [postslug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setError(false);

    try {
      const res = await fetch("/server/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, postslug }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      setSuccessMessage("Registration successful! Confirmation email sent.");
      setFormData({ name: "", email: "", workcollegename: "", contactnumber: "" });
    } catch (error) {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white p-6 shadow-md rounded-lg mb-20">
      <h2 className="text-2xl font-semibold text-center mb-4">Registration</h2>

      {error && <p className="text-red-500 text-center">Something went wrong. Please try again.</p>}
      {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Workspace / College Name</label>
          <input
            type="text"
            id="workcollegename"
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your workspace or college"
            value={formData.workcollegename}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Contact Number</label>
          <input
            type="tel"
            id="contactnumber"
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your contact number"
            value={formData.contactnumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Post Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            value={postTitle}
            disabled
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-md transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
