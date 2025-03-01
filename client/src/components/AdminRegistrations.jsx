import React, { useState, useEffect } from "react";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/server/user/getregistration");
        const data = await res.json();
        if (!data.success) throw new Error("Failed to fetch registrations");
        setRegistrations(data.registrations);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error)
    return (
      <div className="text-center text-red-500 text-lg">
        Error loading registrations.
      </div>
    );

  return (
    <div className="w-full p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">All Registrations</h2>

      {registrations.length === 0 ? (
        <p className="text-gray-500 text-center">No registrations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full mt-10 bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Contact Number</th>
                <th className="py-3 px-4 text-left">Course Title</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg, index) => (
                <tr
                  key={reg._id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{reg.name}</td>
                  <td className="py-3 px-4">{reg.email}</td>
                  <td className="py-3 px-4">{reg.contactnumber}</td>
                  <td className="py-3 px-4 capitalize">
                    {reg.postslug.replace(/-/g, " ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
