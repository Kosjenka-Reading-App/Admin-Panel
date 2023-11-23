import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  ADMIN_PERMISSIONS_VALUE,
  AdminPermission,
} from "../constants/permissions";

export default function ProtectedRoute({
  element,
  permissionLevel,
}: {
  element: React.ReactNode;
  permissionLevel: AdminPermission;
}) {
  const { isLoggedIn, loading, type } = useAuth();

  if (loading) return <></>;

  if (!isLoggedIn) return <Navigate to="/login" />;

  const required = ADMIN_PERMISSIONS_VALUE[permissionLevel];
  const actual = ADMIN_PERMISSIONS_VALUE[type!];

  console.log("TESTING", required, actual);

  if (required > actual) {
    return <Navigate to="/404" />;
  }

  return element;
}
