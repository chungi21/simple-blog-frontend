import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostForEdit, updatePost } from "../api/postApi";
import PostForm from "../components/PostForm";

export default function PostEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        // 수정용 게시글 데이터 불러오기
        fetchPostForEdit(id, token)
            .then((data) => {
                setTitle(data.title);
                setContent(data.content);
            })
            .catch((err) => {
                alert("게시글 정보를 불러오지 못했습니다.");
                console.error(err);
            });
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updatePost(id, { title, content }, token);
            alert("게시글이 수정되었습니다.");
            navigate(`/posts/${id}`);
        } catch (err) {
            alert("수정에 실패했습니다.");
            console.error(err);
        }
    };

    return (
        <div>
            <h2>게시글 수정</h2>
            <PostForm
                title={title}
                content={content}
                onChangeTitle={(e) => setTitle(e.target.value)}
                onChangeContent={(e) => setContent(e.target.value)}
                onSubmit={handleSubmit}
                submitText="수정"
            />
        </div>
    );
}
