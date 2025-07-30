import React, { useEffect, useState } from "react";
import { getCurrentUserId } from "../utils/auth";

import axios from "axios";

export default function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        // 댓글 불러오기
        axios.get(`http://localhost:9000/api/comments/post/${postId}`)
            .then(res => setComments(res.data.data))
            .catch(err => console.error(err));

        // 로그인한 사용자 ID (localStorage에서 직접)
        const userId = getCurrentUserId();
        if (userId) {
            setCurrentUserId(userId);
        }
    }, [postId]);




    return (
        <div>
            <h3>댓글 목록</h3>
            {comments.length === 0 ? (
                <p>등록된 댓글이 없습니다.</p>
            ) : (
                comments.map(comment => (
                    <div key={comment.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}>
                        <p><strong>{comment.writerNickname}</strong></p>
                        <p>{comment.content}</p>
                        {currentUserId === comment.writerId && (
                            <>
                                <button>수정</button>
                                <button>삭제</button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
