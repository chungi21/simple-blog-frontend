import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 page 파라미터 가져오기 (없으면 0)
  const pageParam = parseInt(searchParams.get("page")) || 0;
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    fetch(`http://localhost:9000/api/posts?page=${page}`)
      .then((res) => res.json())
      .then((resData) => {
        const { data } = resData;
        setPosts(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error("게시글 목록 불러오기 실패:", err);
      });
  }, [page]);

  // 페이지 변경 시 URL 파라미터도 변경
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>게시글 목록</h1>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "8px 0",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>

      <Pagination page={page} onPageChange={handlePageChange} totalPages={totalPages} />
    </div>
  );
}
