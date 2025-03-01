import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Profilesidebar from "../components/Profilesidebar";
import Profileview from "../components/Profileview";
import Profilepost from "./Profilepost";
import Profileuser from "../components/Profileuser";
import AdminRegistrations from "../components/AdminRegistrations";

export default function Profile() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const urlParams = new URLSearchParams(location.search);
  useEffect(() => {
    const tabUrl = urlParams.get("tab");
    setTab(tabUrl || "profile"); 
  }, [location.search]);

  return (
    <div className="flex flex-col  md:flex-row  min-h-screen">
      <div className="w-full md:w-70 ">  
        <Profilesidebar />
      </div>
      <div className="w-3/4">
        {tab === "profile" && <Profileview />}
        {tab === "post" && <Profilepost />}
        {tab === "user" && <Profileuser />}
        {tab === "postslug" && <AdminRegistrations />}
      </div>
    </div>
  );
}
