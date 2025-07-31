import axiosInstance from "../api/axiosInstance"; 

const API_BASE = '/api';  

export const fetchPostDetail = async (id) => {
    const res = await axiosInstance.get(`${API_BASE}/posts/${id}`);
    return res.data.data;
};

export const deletePost = async (id) => {
    const res = await axiosInstance.delete(`${API_BASE}/posts/${id}`);
    return res.data;
};

export const fetchPostForEdit = async (id) => {
    const res = await axiosInstance.get(`${API_BASE}/posts/${id}/edit`);
    return res.data.data;
};

export const updatePost = async (id, updatedData) => {
    const res = await axiosInstance.put(`${API_BASE}/posts/${id}`, updatedData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};
