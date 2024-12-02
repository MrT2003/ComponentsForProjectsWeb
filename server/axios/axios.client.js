import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.MOVIE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors if needed
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosClient;
