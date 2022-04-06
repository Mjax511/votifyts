import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute: React.FC<{
  redirectPath?: string;
}> = ({ children, redirectPath = "/login" }) => {
  const auth = useAuth();
  console.log(auth?.user);
  if (!auth?.user || auth?.user === "") return <Navigate to={redirectPath} />;
  return children ? (children as React.ReactElement) : <Outlet />;
};
