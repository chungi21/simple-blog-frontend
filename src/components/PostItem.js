import { useNavigate } from "react-router-dom";

export default function PostItem({ post }) {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <li onClick={goToDetail} style={{ cursor: "pointer", padding: "8px 0" }}>
      <strong>{post.title}</strong> — {post.content.slice(0, 50)}...
    </li>
  );
}