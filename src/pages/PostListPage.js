import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function PostListPage() {
  const { email } = useParams(); // 동적 경로에서 email 받아오기
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page")) || 0;
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    const baseUrl = email
      ? `http://localhost:9000/api/posts/email/${email}`
      : `http://localhost:9000/api/posts`;

    fetch(`${baseUrl}?page=${page}`)
      .then((res) => res.json())
      .then((resData) => {
        const { data } = resData;
        setPosts(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error("게시글 목록 불러오기 실패:", err);
      });
  }, [email, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>게시글 목록</h1>
      <ul>
        {posts.length === 0 ? (
          <li style={{ padding: "8px 0", color: "#777" }}>작성된 게시글이 없습니다.</li>
        ) : (
          posts.map((post) => (
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
          ))
        )}
      </ul>

      <Pagination page={page} onPageChange={handlePageChange} totalPages={totalPages} />
    </div>
  );
}
