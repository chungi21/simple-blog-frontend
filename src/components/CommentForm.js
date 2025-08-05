// CommentForm.jsx
import React, { useState } from "react";
import { createComment, updateComment } from "../api/commentApi";

export default function CommentForm({
    postId,
    initialContent = "",
    commentId = null,
    onSuccess,
    onCancel,
}) {
    const [content, setContent] = useState(initialContent);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);

        try {
            if (commentId) {
                await updateComment({ commentId, content });
            } else {
                await createComment({ postId, content });
            }

            onSuccess();
            setContent("");
        } catch (error) {
            console.error("댓글 처리 실패", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={commentId ? "" : "p-4 bg-white rounded shadow mb-[10px]"}
        >
            <textarea
                className="border border-[#eee] rounded-[10px] mb-[10px] hover:bg-gray-50 p-1 block w-full"
                rows="4"
                placeholder="댓글을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <div className="!text-right">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    {isSubmitting
                        ? "처리 중..."
                        : commentId
                            ? "댓글 수정"
                            : "댓글 등록"}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-1"
                    >
                        취소
                    </button>
                )}
            </div>
        </form>
    );
}
