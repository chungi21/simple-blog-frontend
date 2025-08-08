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

  const goToBlog = () => {
    const writerEmail = post.member?.email;
    if (!writerEmail) return;

    navigate(`/posts?email=${writerEmail}`);
  };

  return (
    <li className="border border-[#eee] rounded-[10px] mb-[10px]">
      <div onClick={goToDetail} className="hover:bg-gray-50 p-2">
        <strong>{post.title}</strong>
        <br />
        {post.content.slice(0, 50)}
      </div>
      {!email && (
        <div className="p-2">
          <button onClick={goToBlog}>
            작성자 {post.member.nickname}님의 블로그 방문하기
          </button>
        </div>
      )}
    </li>
  );
}
