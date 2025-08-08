import { useNavigate } from "react-router-dom";

export default function PostItem({ post, email, page }) {
  const navigate = useNavigate();

  const goToDetail = () => {
    const state = { page };
    // 현재 목록이 회원별이면 email 같이 전달
    if (email) {
      state.email = email;
    }
    navigate(`/posts/${post.id}`, { state });
  };

  return (
    <li
      onClick={goToDetail}
      className="border border-[#eee] rounded-[10px] mb-[10px] hover:bg-gray-50 p-2"
    >
      <strong>{post.title}</strong>
      <br />
      {post.content.slice(0, 50)}
    </li>
  );
}
