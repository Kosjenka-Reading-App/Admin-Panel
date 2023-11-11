import { jsonPost } from "./axios";
import Cookies from "js-cookie";

const login = async (email: string, password: string) => {
  return jsonPost("/login", { email, password })
    .then((response) => {
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      Cookies.set("accessToken", accessToken, { expires: 20 / (24 * 60) });
      Cookies.set("refreshToken", refreshToken);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { login };
