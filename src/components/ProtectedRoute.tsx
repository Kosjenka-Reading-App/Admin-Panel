import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  ADMIN_PERMISSIONS_VALUE,
  AdminPermission,
} from "../constants/permissions";
import { ROUTES } from "../constants/navbar";

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

  if (required > actual) {
    const validRoute = ROUTES.find(
      (route) => ADMIN_PERMISSIONS_VALUE[route.permission] <= actual
    );

    return <Navigate to={validRoute?.path || "/404"} />;
  }

  return element;
}
