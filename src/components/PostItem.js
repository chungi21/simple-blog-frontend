import { useNavigate } from "react-router-dom";

export default function PostItem({ post }) {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <li onClick={goToDetail} className="border border-[#eee] rounded-[10px] mb-[10px] hover:bg-gray-50">
      <strong>{post.title}</strong><br/>{post.content.slice(0, 50)}
    </li>
  );
}