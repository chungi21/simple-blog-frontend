import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import PostItem from "../components/PostItem";
import { fetchPostList, fetchPostListByEmail } from "../api/postApi";
import { fetchMemberByEmail } from "../api/memberApi"; 

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
    const loadPosts = async () => {
      try {
        const data = email
          ? await fetchPostListByEmail(email, page)
          : await fetchPostList(page);

        setPosts(data.data.content);
        setTotalPages(data.data.totalPages);
      } catch (err) {
        console.error("게시글 목록 불러오기 실패:", err);
      }
    };

    loadPosts();
  }, [email, page]);

  // 닉네임 요청
  useEffect(() => {
    if (!email) return;

    fetchMemberByEmail(email)
      .then((res) => {
        setNickname(res.data.nickname);
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
              posts.map((post) => <PostItem key={post.id} post={post} />)
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
