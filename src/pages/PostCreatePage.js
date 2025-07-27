import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("게시글 작성 실패");
      }

      const data = await response.json();
      navigate(`/posts/${data.id}`);
    } catch (error) {
      alert("게시글 작성 실패");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <PostForm
        title={title}
        content={content}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeContent={(e) => setContent(e.target.value)}
        onSubmit={handleSubmit}
        submitText="작성"
      />
    </div>
  );
}
