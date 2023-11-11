import Cookies from 'js-cookie'
import axios from 'axios';
import config from "../config";

const api = axios.create({
  baseURL : config.API_BASE_ROUTE
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;

      // If the error status is 403, it means the token has expired and we need to refresh it
      if (error.response.status === 403 && error.response.status === 422) {
          try {
              const refreshToken = Cookies.get('refreshToken');
              console.log(refreshToken)
              const response = await api.post('/refresh', {refresh_token:refreshToken } ,
                  {
                      headers: { 'Content-Type': 'application/json' },

                  });
              console.log('Refresh Token Response:', response);

              const { new_accessToken, new_refreshToken } = response.data;

              console.log('New Access Token:', new_accessToken);
              console.log('New Refresh Token:', new_refreshToken);

              Cookies.set('accessToken', new_accessToken);
              Cookies.set('refreshToken', new_refreshToken);

              // Retry the original request with the new token
              originalRequest.headers.Authorization = `Bearer ${new_accessToken}`;
              console.log('Retrying Original Request with New Token:', originalRequest);
              return axios(originalRequest);
          } catch (error) {
              // Handle refresh token error or redirect to login
              console.error('Error refreshing token:', error);
              // You might want to redirect to the login page or show an error message
          }
      }

      return Promise.reject(error);
  }
);
