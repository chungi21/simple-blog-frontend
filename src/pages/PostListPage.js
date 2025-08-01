import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import PostItem from "../components/PostItem";
import { customFetch } from "../utils/request";

export default function PostListPage() {
  const { email } = useParams();
  const [nickname, setNickname] = useState("");
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page")) || 0;
  const [page, setPage] = useState(pageParam);

  // 게시글 목록 요청
  useEffect(() => {
    const endpoint = email
      ? `http://localhost:9000/api/posts/email/${email}`
      : `http://localhost:9000/api/posts`;

    customFetch(`${endpoint}?page=${page}`)
      .then((resData) => {
        const { data } = resData;
        setPosts(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error("게시글 목록 불러오기 실패:", err);
      });
  }, [email, page]);

  // 닉네임 요청 (email 있을 때만)
  useEffect(() => {
    if (!email) return;

    customFetch(`http://localhost:9000/api/member/email/${email}`)
      .then((res) => {
        setNickname(res.data.nickname); // ← res.data 안에 nickname 있음
      })
      .catch((err) => {
        console.error("닉네임 가져오기 실패:", err);
      });
  }, [email]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      {nickname && (
        <h2 style={{ color: "#333", marginBottom: "16px" }}>
          {nickname}의 블로그
        </h2>
      )}

      <h1>게시글 목록</h1>
      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {posts.length === 0 ? (
          <li style={{ padding: "8px 0", color: "#777" }}>
            작성된 게시글이 없습니다.
          </li>
        ) : (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </ul>

      <Pagination
        page={page}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}
