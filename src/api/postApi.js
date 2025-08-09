import axiosInstance from "../api/axiosInstance";

const API_BASE = '/api';

// 글 작성 Form
export const fetchPostForm = async () => {
  const res = await axiosInstance.get(`${API_BASE}/posts/form`);
  return res.data.data;
};


// 글 쓰기
export const createPost = async ({ title, content }) => {
  const res = await axiosInstance.post(`${API_BASE}/posts`, { title, content });
  return res.data;
};

// 글 상세페이지
export const fetchPostDetail = async (postId) => {
  const res = await axiosInstance.get(`${API_BASE}/posts/${postId}`);
  return res.data.data;
};

// 글 삭제
export const deletePost = async (postId) => {
  const res = await axiosInstance.delete(`${API_BASE}/posts/${postId}`);
  return res.data;
};

// 글 수정 Form(수정용 게시글 불러오기)
export const fetchPostForEdit = async (postId) => {
  const res = await axiosInstance.get(`${API_BASE}/posts/${postId}/form`);
  return res.data.data;
};

// 글 수정
export const updatePost = async (postId, updatedData) => {
  const res = await axiosInstance.put(`${API_BASE}/posts/${postId}`, updatedData);
  return res.data;
};

// 게시글 목록 조회 (전체 + 회원별)
export const fetchPostList = async (page = 0, email) => {
  const params = new URLSearchParams({ page });
  if (email) params.append("email", email);

  const res = await axiosInstance.get(`${API_BASE}/posts?${params.toString()}`);
  return res.data;
};