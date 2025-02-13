import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
export default function OnlyAdmin() {
  const { user } = useSelector((state) => state.user);
  return user.isAuth ? <Outlet /> : <Navigate to="/Signin" />;
}
