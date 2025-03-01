import { useEffect, useState } from "react";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/server/user/mycourses");
        const data = await res.json();
        if (data.success) {
          setCourses(data.courses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        My Courses
      </h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No courses registered yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Course Image</th>
                <th className="py-4 px-6 text-left">Course Title</th>
                <th className="py-4 px-6 text-left">Registereation Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="border-t hover:bg-gray-100 transition">
                  <td className="py-3 px-6">
                    <img src={course.image} alt={course.title} className="w-24 h-16 object-cover rounded-md" />
                  </td>
                  <td className="py-3 px-6">{course.title}</td>
                  <td className="py-3 px-6 text-green-600">Success</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
