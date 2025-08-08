import { useEffect, useState } from "react";
import RecentMembers from "../components/RecentMembers";
import PostItem from "../components/PostItem";
import { fetchPostList } from "../api/postApi";
import { Link } from "react-router-dom";
export default function MainPage() {
    const [posts, setPosts] = useState([]);

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

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="p-14 bg-white rounded shadow text-3xl font-semibold mb-10">
                Welcome SimpleBlog
            </h1>

            <div className="p-4 bg-white rounded shadow !text-left mt-10 mb-10">
                <h2 className="text-xl font-semibold mb-3">최근 게시글</h2>
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
                    <Link className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-1" to="">전체 게시글 보러가기</Link>
                </div>
            </div>

            <RecentMembers />

        </div>
    );
}
