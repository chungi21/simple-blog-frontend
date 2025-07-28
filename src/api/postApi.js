import axios from 'axios';

const API_BASE = 'http://localhost:9000/api';

export const fetchPostDetail = async (id) => {
    const res = await axios.get(`${API_BASE}/posts/${id}`);
    return res.data.data;
};

export const deletePost = async (id, token) => {
    const res = await axios.delete(`${API_BASE}/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const fetchPostForEdit = async (id, token) => {
    const res = await axios.get(`${API_BASE}/posts/${id}/edit`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data.data;
};

export const updatePost = async (id, updatedData, token) => {
    const res = await axios.put(`${API_BASE}/posts/${id}`, updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return res.data;
};
