import { useEffect, useState } from "react";
import { get } from "../services/axios";
import { useLocation } from "react-router-dom";
import { AdminPermission } from "../constants/permissions";

export type AuthData = {
  loading: boolean;
  isLoggedIn: boolean;
  type: AdminPermission | null;
};

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<AdminPermission | null>(null);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    get("/me")
      .then((body) => {
        setIsLoggedIn(true);
        setLoading(false);
        setType(body.data.account_category);
      })
      .catch(() => {
        setLoading(false);
        setIsLoggedIn(false);
      });
  }, [location.pathname]);

  return { loading, isLoggedIn, type } as AuthData;
}
