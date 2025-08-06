import axiosInstance from "../api/axiosInstance"; 

const API_BASE = '/api';  

// 글 쓰기
export const createPost = async ({ title, content }) => {
  const response = await axiosInstance.post(`${API_BASE}/posts`, { title, content });
  return response.data;
};

// 글 상세페이지
export const fetchPostDetail = async (id) => {
    const res = await axiosInstance.get(`${API_BASE}/posts/${id}`);
    return res.data.data;
};

// 글 삭제
export const deletePost = async (id) => {
    const res = await axiosInstance.delete(`${API_BASE}/posts/${id}`);
    return res.data;
};

// 글 수정 Form(수정용 게시글 불러오기)
export const fetchPostForEdit = async (id) => {
    const res = await axiosInstance.get(`${API_BASE}/posts/${id}/edit`);
    return res.data.data;
};

// 글 수정
export const updatePost = async (id, updatedData) => {
    const res = await axiosInstance.put(`${API_BASE}/posts/${id}`, updatedData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};

// 게시글 목록 조회
export const fetchPostList = async (page = 0) => {
  const res = await axiosInstance.get(`${API_BASE}/posts?page=${page}`);
  return res.data;
};

// 특정 이메일의 게시글 목록 조회
export const fetchPostListByEmail = async (email, page = 0) => {
  const res = await axiosInstance.get(`${API_BASE}/posts/email/${email}?page=${page}`);
  return res.data;
};