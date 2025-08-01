import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../api/postApi';

export default function PostActions({ postId, authorEmail }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const currentUserEmail = localStorage.getItem('userEmail'); // Header에서 미리 저장해둔 이메일

    const isAuthor = currentUserEmail === authorEmail;

    const handleDelete = async () => {
        const confirm = window.confirm("정말 삭제하시겠습니까?");
        if (!confirm) return;

        try {
            await deletePost(postId);
            alert("삭제되었습니다.");
            navigate(`/posts/email/${currentUserEmail}`);
        } catch (error) {
            alert("삭제 실패");
            console.error(error);
        }
    };

    const handleEdit = () => {
        navigate(`/posts/${postId}/edit`);
    };

    if (!isAuthor) return null;

    return (
        <span>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
        </span>
    );
}
