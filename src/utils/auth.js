// 로그인 여부 확인
export function isLoggedIn() {
  const token = localStorage.getItem("accessToken");
  return !!token;
}

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
    const response = await fetch("http://localhost:9000/auth/refresh", {
      method: "POST",
      credentials: "include", // 쿠키 포함
    });

    if (!response.ok) throw new Error("Token refresh failed");

    const data = await response.json();
    const newToken = data.data.accessToken;

    localStorage.setItem("accessToken", newToken);

    return true;
  } catch (error) {
    console.error("AccessToken 재발급 실패:", error);
    return false;
  }
}
