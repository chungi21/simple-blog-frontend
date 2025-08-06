import axiosInstance from "../api/axiosInstance";

// 로그인 여부 확인
export function isLoggedIn() {
  const token = localStorage.getItem("accessToken");
  return !!token;
}

// 로그인한 사용자의 email
export function saveCurrentUserEmail(email) {
  localStorage.setItem("userEmail", email);
}

// 로그인 사용자 ID 저장 (사용자 정보 가져왔을 때 호출)
export function saveCurrentUserId(id) {
  localStorage.setItem("userId", id);
}

// 로그인 사용자 ID 가져오기
export function getCurrentUserId() {
  const id = localStorage.getItem("userId");
  return id ? parseInt(id) : null;
}

// 토큰 재발급
export async function refreshAccessToken() {
  try {
    const response = await axiosInstance.post("/auth/refresh");

    const newToken = response.data.data.accessToken;

    if (!newToken) throw new Error("새로운 AccessToken이 없습니다.");

    localStorage.setItem("accessToken", newToken);

    return true;
  } catch (error) {
    console.error("AccessToken 재발급 실패:", error);
    return false;
  }
}

// 로그아웃
export const logout = async () => {
  const response = await axiosInstance.post("/logout");
  return response.data;
};