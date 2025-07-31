import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9000",
    withCredentials: true, // 모든 요청에 쿠키 포함
});

export default axiosInstance;