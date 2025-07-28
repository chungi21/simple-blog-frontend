import axios from 'axios';

export const fetchCurrentUser = async () => {
    const token = localStorage.getItem('accessToken');
    try {
        const res = await axios.get('http://localhost:9000/api/members/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // 쿠키 인증 시 필요
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};
