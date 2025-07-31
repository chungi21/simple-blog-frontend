import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUserId } from "../utils/auth";
import CommentForm from "./CommentForm"; // 댓글 폼 컴포넌트 import

export default function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID

    useEffect(() => {
        fetchComments();

        const userId = getCurrentUserId();
        if (userId) {
            setCurrentUserId(parseInt(userId)); // userId는 string이므로 숫자로 변환
        }
    }, [postId]);

    const fetchComments = () => {
        axios
            .get(`http://localhost:9000/api/comments/post/${postId}`)
            .then((res) => setComments(res.data.data))
            .catch((err) => console.error(err));
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
        const token = localStorage.getItem("accessToken");

        try {
            await axios.delete(`http://localhost:9000/api/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchComments(); // 삭제 후 새로고침
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("댓글 삭제에 실패했습니다.");
        }
    };

    return (
        <div>
            <h3>댓글 목록</h3>
            {comments.length === 0 ? (
                <p>등록된 댓글이 없습니다.</p>
            ) : (
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        style={{
                            marginBottom: "1rem",
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "1rem",
                        }}
                    >
                        <p>
                            <strong>{comment.writerNickname}</strong>
                        </p>

                        {/* 수정 중이면 폼 보여주기, 아니면 평소처럼 표시 */}
                        {editingCommentId === comment.id ? (
                            <CommentForm
                                commentId={comment.id}
                                initialContent={comment.content}
                                onSuccess={() => {
                                    setEditingCommentId(null);
                                    fetchComments(); // 수정 후 리스트 새로고침
                                }}
                                onCancel={() => setEditingCommentId(null)}
                            />
                        ) : (
                            <p>{comment.content}</p>
                        )}

                        {currentUserId === comment.writerId && editingCommentId !== comment.id && (
                            <>
                                <button onClick={() => setEditingCommentId(comment.id)}>수정</button>
                                <button onClick={() => handleDelete(comment.id)}>삭제</button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
