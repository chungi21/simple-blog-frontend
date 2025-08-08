// CommentList.jsx
import React, { useEffect, useState } from "react";
import { getCurrentUserId } from "../utils/auth";
import CommentForm from "./CommentForm";
import { fetchCommentsByPostId, deleteComment } from "../api/commentApi";

export default function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);

    useEffect(() => {
        fetchComments();

        const userId = getCurrentUserId();
        if (userId) {
            setCurrentUserId(parseInt(userId));
        }
    }, [postId]);

    const fetchComments = async () => {
        try {
            const data = await fetchCommentsByPostId(postId);
            setComments(data);
        } catch (err) {
            if (err.response?.status === 404) {
                alert("게시글이 존재하지 않습니다.");
            } else {
                alert("댓글 불러오기 실패했습니다.");
            }
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

        try {
            await deleteComment(commentId);
            fetchComments();
        } catch (err) {
            if (err.response?.status === 401) {
                alert("로그인이 필요합니다.");
            } else if (err.response?.status === 403) {
                alert("작성자만 삭제 할 수 있습니다.");
            } else if (err.response?.status === 404) {
                alert("게시글이 존재하지 않습니다.");
            } else {
                alert("댓글 삭제에 실패했습니다.");
            }
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow mb-[10px] mt-[15px] !text-left">
            <h3 className="text-xl font-semibold mx-auto mb-[10px]">댓글 목록</h3>
            {comments.length === 0 ? (
                <p>등록된 댓글이 없습니다.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="mt-[15px]">
                        <div>
                            <p>
                                <strong>{comment.writerNickname}</strong>
                            </p>

                            {editingCommentId === comment.id ? (
                                <CommentForm
                                    commentId={comment.id}
                                    initialContent={comment.content}
                                    onSuccess={() => {
                                        setEditingCommentId(null);
                                        fetchComments();
                                    }}
                                    onCancel={() => setEditingCommentId(null)}
                                />
                            ) : (
                                <p>{comment.content}</p>
                            )}
                        </div>

                        {currentUserId === comment.writerId &&
                            editingCommentId !== comment.id && (
                                <div className="!text-right">
                                    <button
                                        onClick={() => setEditingCommentId(comment.id)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-1"
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                        <hr className="mt-[10px]" />
                    </div>
                ))
            )}
        </div>
    );
}
