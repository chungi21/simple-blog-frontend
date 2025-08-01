import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // 경로 확인 필요

export default function RecentMembers() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchRecentMembers = async () => {
            try {
                const res = await axiosInstance.get("/api/members/recent");
                setMembers(res.data.data.content || res.data.data);
            } catch (error) {
                console.error("최근 회원 불러오기 실패:", error);
            }
        };

        fetchRecentMembers();
    }, []);

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-3">새로 개설된 블로그에 방문해보세요!</h2>
            <ul className="space-y-2">
                {members.map((member, idx) => (
                    <li key={idx} className="border-b pb-2">
                        <Link to={`/posts/email/${member.email}`}>
                            {member.nickname}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
