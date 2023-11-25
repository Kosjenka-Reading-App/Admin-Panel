import { jsonPost } from "./axios";
import Cookies from "js-cookie";

const login = (email: string, password: string) => {
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

const logOut = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

const forgotPassword = (email: string) => {
  return jsonPost("/password/forgot", { email });
};

const resetPassword = (password: string, token: string) => {
  return jsonPost("/password/reset", { password, token });
};

export { login, logOut, forgotPassword, resetPassword };