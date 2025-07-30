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
