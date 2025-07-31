// CommentForm.jsx
import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance"; // 경로는 실제 프로젝트에 맞게 조정

export default function CommentForm({
    postId,
    initialContent = "",
    commentId = null,
    onSuccess,
    onCancel
}) {
    const [content, setContent] = useState(initialContent);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);

        const url = commentId
            ? `/api/comments/${commentId}`
            : "/api/comments";
        const method = commentId ? "put" : "post";
        const payload = commentId
            ? { content }
            : { postId: parseInt(postId), content };

        try {
            await axiosInstance({
                method,
                url,
                data: payload,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            onSuccess(); // 댓글 등록 또는 수정 후 콜백
            setContent("");
        } catch (error) {
            console.error("댓글 처리 실패", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                rows="4"
                placeholder="댓글을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ width: "100%", marginBottom: "10px" }}
            />
            <br />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "처리 중..." : commentId ? "댓글 수정" : "댓글 등록"}
            </button>
            {onCancel && (
                <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
                    취소
                </button>
            )}
        </form>
    );
}
