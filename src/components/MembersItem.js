import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPostList } from "../api/postApi";

export default function MembersItem({ member }) {
    const [postCount, setPostCount] = useState(null);

    useEffect(() => {
        const loadPostCount = async () => {
            try {
                const data = await fetchPostList(0, member.email);
                setPostCount(data.data.totalElements);
            } catch (error) {
                console.error("게시물 수 불러오기 실패:", error);
                setPostCount(0);
            }
        };

        if (member?.email) {
            loadPostCount();
        }
    }, [member]);

    return (
        <li className="border border-[#eee] rounded-[10px] mb-[10px] hover:bg-gray-50">
            <Link
                to={`/posts?email=${member.email}`}
                className="block px-3 bg-gray-500 text-white rounded hover:bg-gray-600 p-1"
            >
                {member.nickname}님의 블로그 방문하기
                {postCount !== null && (
                    <span className="ml-2 text-sm text-gray-200">
                        (총 게시물 수 : {postCount})
                    </span>
                )}
            </Link>
        </li>
    );
}
