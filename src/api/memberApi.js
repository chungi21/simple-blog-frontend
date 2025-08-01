import axiosInstance from "./axiosInstance";

export const fetchCurrentUser = async () => {
  const token = localStorage.getItem("accessToken");

  try {
    const res = await axiosInstance.get("/api/members/me", {});

    return res.data;
  } catch (err) {
    throw err;
  }
};