// 📦 Import Axios
import axios from "axios";

const instance = axios.create({
  baseURL:["http://localhost:5000" , "https://ai-interview-backend-uof6.onrender.com"],
  withCredentials: true,
});

// 🔐 Attach JWT token automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
