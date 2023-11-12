import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  element,
  isLoggedIn,
  loading,
}: {
  element: React.ReactNode;
  isLoggedIn: boolean;
  loading: boolean;
}) {
  if (loading) return <></>;

  return isLoggedIn ? element : <Navigate to="/login" />;
}
