import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostForEdit, updatePost } from "../api/postApi";
import PostForm from "../components/PostForm";

export default function PostEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {

        fetchPostForEdit(id)
            .then((data) => {
                setTitle(data.title);
                setContent(data.content);
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    alert("로그인이 필요합니다.");
                    navigate("/login");
                } else if (err.response?.status === 403) {
                    alert("작성자만 수정할 수 있습니다.");
                    navigate(`/posts/${id}`);
                } else if (err.response?.status === 404) {
                    alert("게시글이 존재하지 않습니다.");
                    navigate("/");
                } else {
                    alert("게시글 정보를 불러오지 못했습니다.");
                }

                console.error(err);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updatePost(id, { title, content });
            alert("게시글이 수정되었습니다.");
            navigate(`/posts/${id}`);
        } catch (err) {
            alert("수정에 실패했습니다.");
            console.error(err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-3 text-left">게시글 수정</h2>
                <PostForm
                    title={title}
                    content={content}
                    onChangeTitle={(e) => setTitle(e.target.value)}
                    onChangeContent={(e) => setContent(e.target.value)}
                    onSubmit={handleSubmit}
                    submitText="수정"
                />
            </div>
        </div>
    );
}
