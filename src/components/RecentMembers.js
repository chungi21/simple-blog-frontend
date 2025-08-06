import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRecentMembers } from "../api/memberApi";

export default function RecentMembers() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const loadMembers = async () => {
            try {
                const data = await fetchRecentMembers();
                setMembers(data);
            } catch (error) {
                console.error("최근 회원 불러오기 실패:", error);
            }
        };

        loadMembers();
    }, []);

    return (
        <div className="p-4 bg-white rounded shadow !text-left">
            <h2 className="text-xl font-semibold mb-3">
                새로 개설된 블로그에 방문해보세요!
            </h2>
            <ul className="space-y-2 recent-member">
                {members.map((member, idx) => (
                    <li
                        key={idx}
                        className="border border-[#eee] rounded-[10px] mb-[10px] hover:bg-gray-50 p-2"
                    >
                        <Link to={`/posts/email/${member.email}`} className="block">
                            {member.nickname}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
