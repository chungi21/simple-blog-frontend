import axiosInstance from "./axiosInstance";

const API_BASE = '/api';

// 댓글 쓰기
export const createComment = async ({ postId, content }) => {
  const response = await axiosInstance.post(`${API_BASE}/comments`, {
    postId,
    content,
  });

  return response.data;
};

// 댓글 수정
export const updateComment = async ({ commentId, content }) => {
  const response = await axiosInstance.put(`${API_BASE}/comments/${commentId}`, {
    content,
  });
  
  return response.data;
};

// 댓글 조회 (게시글 기준으로 조회)
export const fetchCommentsByPostId = async (postId) => {
  const res = await axiosInstance.get(`${API_BASE}/comments/post/${postId}`);
  return res.data.data;
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  const res = await axiosInstance.delete(`${API_BASE}/comments/${commentId}`);
  return res.data;
};
