import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AdminRegistrations(postslug) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postslug = searchParams.get("postslug");
  const { user } = useSelector((state) => state.user);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log("Triggered")  
    if(!postslug)return  
    const fetchRegistrations = async (postslug) => {
      console.log("fetch")
      try {
        setLoading(true);
        const res = await fetch(`/server/user/getregistration?postslug=${postslug}`);
        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (!data.registrations || data.registrations.length === 0) {
          console.log("No registrations found");
          setError(true);
          setLoading(false);
          return;
        }
        setRegistrations(data.registrations);
        setError(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        setError(true);
        setLoading(false);
      }
    };

    if (user?.isAuth) { 
        console.log(" Calling fetchRegistrations...");
        fetchRegistrations();
    }
  }, [postslug,user.isAuth,location]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error)
    return <div className="text-red-500">Failed to load registrations</div>;
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Registrations for {postslug}
      </h2>

      {user.isAuth && registrations.length === 0 ? (
        <p className="text-gray-500 text-center">No registrations found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id} className="text-center">
                <td className="border p-2">{reg.name}</td>
                <td className="border p-2">{reg.email}</td>
                <td className="border p-2">{reg.contactnumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
