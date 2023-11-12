import { useEffect, useState } from "react";
import { get } from "../services/axios";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // TODO - This is a hacky way to check if the user is logged in.
  // Update when we have a /me endpoint

  useEffect(() => {
    setLoading(true);
    get("/accounts", {})
      .then(() => {
        setIsLoggedIn(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setIsLoggedIn(false);
      });
  }, []);

  return { loading, isLoggedIn };
}
