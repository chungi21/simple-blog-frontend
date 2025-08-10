import { useEffect, useState } from "react";
import MembersItem from "../components/MembersItem";
import PostItem from "../components/PostItem";
import { fetchPostList } from "../api/postApi";
import { fetchMembers } from "../api/memberApi"; 
import { Link } from "react-router-dom";

export default function MainPage() {
    const [members, setMembers] = useState([]); 
    const [posts, setPosts] = useState([]);

    // 최근 게시물 5개
    useEffect(() => {
        const loadRecentPosts = async () => {
            try {
                const response = await fetchPostList(0);
                const allPosts = response.data.content;
                setPosts(allPosts.slice(0, 5));
            } catch (err) {
                console.error("최근 게시글 로딩 실패:", err);
            }
        };

        loadRecentPosts();
    }, []);

    // 최근 가입 회원 10명
    useEffect(() => {
        const loadRecentMembers = async () => {
            try {
                const data = await fetchMembers({ limit: 10 });
                setMembers(data);
            } catch (error) {
                console.error("최근 회원 불러오기 실패:", error);
            }
        };
        loadRecentMembers();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="p-14 bg-white rounded shadow text-3xl font-semibold mb-10">
                Welcome SimpleBlog
            </h1>

            {/* 최근 게시글 */}
            <div className="p-4 bg-white rounded shadow !text-left mt-10 mb-10">
                <h2 className="text-xl font-semibold mb-3">최근 게시글을 확인해보세요!</h2>
                <ul>
                    {posts.length === 0 ? (
                        <li className="text-gray-500">게시글이 없습니다.</li>
                    ) : (
                        posts.map((post) => (
                            <PostItem key={post.id} post={post} email={null} page={0} />
                        ))
                    )}
                </ul>
                <div className="text-center">
                    <Link
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-1"
                        to="/posts"
                    >
                        전체 게시글 보러가기
                    </Link>
                </div>
            </div>

            {/* 최근 가입 회원 */}
            <div className="p-4 bg-white rounded shadow !text-left mt-10 mb-10">
                <h2 className="text-xl font-semibold mb-3">최근 가입 회원의 블로그를 방문해보세요</h2>
                <ul>
                    {members.length === 0 ? (
                        <li className="text-gray-500">회원이 없습니다.</li>
                    ) : (
                        members.map((member) => (
                            <MembersItem key={member.id} member={member} />
                        ))
                    )}
                </ul>
                <div className="text-center">
                    <Link
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-1"
                        to="/members"
                    >
                        전체 회원 보러가기
                    </Link>
                </div>
            </div>
        </div>
    );
}
