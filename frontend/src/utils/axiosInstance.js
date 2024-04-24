// axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Get the authentication token from local storage
    const token = localStorage.getItem("authToken");

    // Set the authorization header if a token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Return a successful response
    return response;
  },
  (error) => {
    // Handle error responses
    if (error.response && error.response.status === 403) {
      // Unauthorized error, redirect to Login page
      // history.push("/login");
    }
    return Promise.reject(error);
  },
);

export default instance;
