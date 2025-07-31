import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../api/postApi';

export default function PostActions({ postId, authorEmail }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const currentUserEmail = localStorage.getItem('userEmail'); // Header에서 미리 저장해둔 이메일
    console.log("currentUserEmail : ", currentUserEmail);

    const isAuthor = currentUserEmail === authorEmail;

    const handleDelete = async () => {
        const confirm = window.confirm("정말 삭제하시겠습니까?");
        if (!confirm) return;

        try {
            await deletePost(postId);
            alert("삭제되었습니다.");
            navigate(`/posts/email/${currentUserEmail}`);
        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            console.log("errorMessage : ", errorMessage)
            console.error("error object", error);
            console.error("error.response", error.response);
            if (errorMessage === "Posts with comments cannot be deleted") {
                alert("댓글이 달린 게시물은 삭제할 수 없습니다.");
            } else {
                alert("삭제 실패");
            }

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
