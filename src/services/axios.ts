import axios from "axios";
import config from "../config";

import Cookies from "js-cookie";

const api = axios.create({
  baseURL: config.API_BASE_ROUTE,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401, it means the token has expired and we need to refresh it
    if (error.response?.status === 401 && originalRequest.url !== "/refresh") {
      try {
        const refreshToken = Cookies.get("refreshToken");

        const response = await jsonPost("/refresh", {
          refresh_token: refreshToken,
        });

        const {
          access_token: freshAccessToken,
          refresh_token: freshRefreshToken,
        } = response.data;

        Cookies.set("accessToken", freshAccessToken);
        Cookies.set("refreshToken", freshRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${freshAccessToken}`;

        return axios(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export function get(path: string, params?: Record<string, unknown>) {
  return api.get(path, { params });
}

export function jsonPost(path: string, data?: Record<string, unknown>) {
  return api.post(path, data ? JSON.stringify(data) : null, {
    headers: { "Content-Type": "application/json" },
  });
}

export function deleteRequest(path: string) {
  return api.delete(path);
}
export function jsonPatch(path: string, data: Record<string, unknown>) {
  return api.patch(path, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
