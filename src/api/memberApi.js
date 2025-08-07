import axiosInstance from "./axiosInstance";

const API_BASE = '/api';

// 회원가입 요청
export const joinMember = async ({ email, nickname, password }) => {
  try {
    const res = await axiosInstance.post(`/auth/signup`, {
      email,
      nickname,
      password,
    });
    return res.data;
  } catch (err) {
    throw err; 
  }
};

// 로그인 요청 함수
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });

    const accessToken = response.headers["authorization"]; // 소문자 키로 접근
    const token = accessToken?.startsWith("Bearer ")
      ? accessToken.slice(7)
      : accessToken;

    if (!token) throw new Error("AccessToken 누락");

    localStorage.setItem("accessToken", token);

    return token;
  } catch (error) {
    throw error;
  }
};

// 현재 로그인 회원 정보 수정하기
export const updateCurrentUser = async ({ nickname, password }) => {
  try {
    const res = await axiosInstance.put(`${API_BASE}/members/me`, {
      nickname,
      password,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 현재 로그인한 회원 정보 확인(내 정보 수정 Form 에서 사용)
export const fetchCurrentUser = async () => {
  const token = localStorage.getItem("accessToken");

  try {
    const res = await axiosInstance.get(`${API_BASE}/members/me`, {});
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 이메일로 회원 정보 조회(블로그 상단에 누구의 블로그인지 안내하기 위해 사용)
export const fetchMemberByEmail = async (email) => {
  const res = await axiosInstance.get(`${API_BASE}/members/${email}`);
  return res.data;
};

// 최근 가입한 멤버 목록 가져오기(메인에 가입 멤버 보여주기 위해 사용)
export const fetchRecentMembers = async () => {
  const res = await axiosInstance.get(`${API_BASE}/members/recent`);
  return res.data.data.content || res.data.data;
};