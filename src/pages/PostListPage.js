import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import PostItem from "../components/PostItem";
import { fetchPostList } from "../api/postApi";
import { fetchMemberByEmail } from "../api/memberApi";

export default function PostListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const pageParam = parseInt(searchParams.get("page")) || 0;

  const [nickname, setNickname] = useState("");
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(pageParam);
  const navigate = useNavigate();

  // 게시글 목록 요청
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPostList(page, email);
        setPosts(data.data.content);
        setTotalPages(data.data.totalPages);
      } catch (err) {
        if (err.response?.status === 401) {
          alert("해당 블로그가 없습니다.");
        } else if (err.response?.status === 404) {
          alert("해당 블로그의 페이지가 없습니다.");
        } else {
          alert("게시글 목록을 불러오지 못했습니다.");
        }

        navigate("/posts");
      }
    };

    loadPosts();
  }, [email, page]);

  // 닉네임 요청 (회원별 조회일 경우만)
  useEffect(() => {
    if (!email) return;
    fetchMemberByEmail(email)
      .then((res) => setNickname(res.data.nickname))
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("해당 블로그가 없습니다.");
        } else if (err.response?.status === 404) {
          alert("해당 블로그의 페이지가 없습니다.");
        } else {
          alert("닉네임을 불러오지 못했습니다.");
        }

        navigate("/posts");
      });
  }, [email]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const params = {};
    if (email) params.email = email;
    params.page = newPage;
    setSearchParams(params);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {nickname && (
        <div className="p-4">
          <h2 className="p-14 bg-white rounded shadow text-3xl font-semibold mb-10">
            {nickname}님의 블로그
          </h2>
        </div>
      )}
      <div className="p-4">
        <div className="p-4 bg-white rounded shadow !text-left">
          <h2 className="text-xl font-semibold mb-3">게시글 목록</h2>
          <ul className="space-y-2">
            {posts.length === 0 ? (
              <li>작성된 게시글이 없습니다.</li>
            ) : (
              posts.map((post) => <PostItem key={post.id} post={post} email={email} page={page} />)
            )}
          </ul>
        </div>
      </div>
      <Pagination
        page={page}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}
