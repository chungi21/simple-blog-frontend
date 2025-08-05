import axiosInstance from "./axiosInstance";
import { customFetch } from "../utils/request";

// 현재 로그인한 User 확인
export const fetchCurrentUser = async () => {
  const token = localStorage.getItem("accessToken");

  try {
    const res = await axiosInstance.get("/api/members/me", {});

    return res.data;
  } catch (err) {
    throw err;
  }
};

// 회원가입 요청
export const joinMember = async ({ email, nickname, password }) => {
  try {
    const res = await axiosInstance.post("/api/member/join", {
      email,
      nickname,
      password,
    });

    return res.data;
  } catch (err) {
    throw err; // 에러는 컴포넌트에서 처리하게 던져줌
  }
};

// 로그인 요청 함수
export const loginUser = async ({ email, password }) => {
  try {
    const res = await customFetch("http://localhost:9000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      raw: true, // 헤더를 읽기 위해 필요
    });

    const accessToken = res.headers.get("Authorization");

    const token = accessToken?.startsWith("Bearer ")
      ? accessToken.slice(7)
      : accessToken;

    if (!token) throw new Error("AccessToken 누락");

    // 로컬 스토리지에 저장
    localStorage.setItem("accessToken", token);

    return token; // 토큰 반환 (원하면 생략 가능)
  } catch (error) {
    throw error;
  }
};

// 로그인 회원 정보 수정하기
export const updateCurrentUser = async ({ nickname, password }) => {
  try {
    const res = await axiosInstance.put("/api/member/me", {
      nickname,
      password,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};