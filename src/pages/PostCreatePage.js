import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { customFetch } from "../utils/request"; // customFetch import

export default function PostCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await customFetch("http://localhost:9000/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });

      navigate(`/posts/${result.data.id}`);
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
