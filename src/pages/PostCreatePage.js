import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { createPost } from "../api/postApi";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createPost({ title, content });
      navigate(`/posts/${result.data.id}`);
    } catch (error) {
      alert("게시글 작성 실패");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-3 text-left">게시글 작성</h2>
        <PostForm
          title={title}
          content={content}
          onChangeTitle={(e) => setTitle(e.target.value)}
          onChangeContent={(e) => setContent(e.target.value)}
          onSubmit={handleSubmit}
          submitText="작성"
        />
      </div>
    </div>
  );
}
