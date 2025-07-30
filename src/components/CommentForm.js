// CommentForm.jsx
import React, { useState } from "react";
import axios from "axios";

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
        const token = localStorage.getItem("accessToken");

        const url = commentId
            ? `http://localhost:9000/api/comments/${commentId}`
            : "http://localhost:9000/api/comments";
        const method = commentId ? "put" : "post";
        const payload = commentId
            ? { content }
            : { postId: parseInt(postId), content };

        try {
            await axios({
                method,
                url,
                data: payload,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            onSuccess();
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
