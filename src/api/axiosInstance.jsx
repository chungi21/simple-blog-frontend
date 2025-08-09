import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9000",
    withCredentials: true, // 모든 요청에 쿠키 포함
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default axiosInstance;