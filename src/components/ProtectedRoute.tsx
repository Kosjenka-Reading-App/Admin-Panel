import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({
  element,
}: {
  element: React.ReactNode;
}) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <></>;

  return isLoggedIn ? element : <Navigate to="/login" />;
}
