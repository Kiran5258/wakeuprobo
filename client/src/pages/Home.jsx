import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import robotstu from "../asset/robotstu.webp";
import studentReviewImg from "../asset/studentReviewImg.jpg";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);

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

  const faqData = [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "What is Tailwind CSS?",
      answer:
        "Tailwind CSS is a utility-first CSS framework for styling websites.",
    },
    {
      question: "How does useState work?",
      answer:
        "useState is a React Hook that lets you add state to functional components.",
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript that looks similar to HTML and is used with React.",
    },
  ];

  const reviews = [
    { score: 9.6, image: studentReviewImg },
    { score: 9.8, image: studentReviewImg },
    { score: 9.7, image: studentReviewImg },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row md:flex-row justify-between items-center w-full h-full container">
        <p className="pl-5 ml-10 text-left m-4 text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-gray-700 max-w-lg">
          Empower your future with knowledge.
          <span className="text-red-400"> Start learning today</span>, and
          unlock endless possibilities tomorrow.
        </p>
        <div className="w-full lg:w-auto flex justify-center mt-4 md:flex md:justify-end lg:justify-end md:w-auto">
          <img
            src={robotstu}
            alt="robotstudy"
            className="w-100 sm:w-2/3 lg:w-96 md:w-96 p-4 mt-8 lg:mt-0 md:mt-0 py-8 rounded-md shadow-lg border border-gray-200"
          />
        </div>
      </div>

      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Featured Courses
        </h2>

        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load courses.
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">
            Courses will be added soon.
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {posts.map((post) => (
              <motion.div
                key={post._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
                className="bg-white shadow-md rounded-lg p-3 hover:shadow-lg transition duration-300"
              >
                <Link to={`/course/${post.slug}`}>
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
                  <div className="mt-3 flex justify-center">
                    <div className="bg-gray-100 p-2 rounded-md shadow w-full text-center">
                      <span className="text-lg font-bold text-blue-600">
                        Rs.{post.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
      <div className="flex w-full mb-10 mx-auto mt-10 rounded-lg shadow-lg">
        <div className="w-1/3 bg-gray-100 p-4">
          <h2 className="text-xl font-bold mb-4">FAQs</h2>
          <ul className="space-y-2">
            {faqData.map((faq, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 cursor-pointer rounded-md transition-all duration-300 ${
                  selectedQuestion === index
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() =>
                  setSelectedQuestion(selectedQuestion === index ? null : index)
                }
              >
                {faq.question}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 p-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedQuestion !== null && (
              <motion.p
                key={selectedQuestion}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-lg text-gray-800"
              >
                {faqData[selectedQuestion].answer}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.h1
          className="text-center text-2xl font-bold mt-10 mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Student Review
        </motion.h1>
        <div className="flex justify-center space-x-4 mb-10 mt-10 h-60">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center w-40"
            >
              <img
                src={review.image}
                alt="Student Review"
                className="w-40 h-40 rounded-full mb-2"
              />
              <p className="text-lg font-semibold">{review.score}/10</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
