import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import MembersItem from "../components/MembersItem";
import { fetchMembers } from "../api/memberApi";

export default function MembersPage() {
    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const loadMembers = async () => {
            try {
                const data = await fetchMembers({ page });
                setMembers(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                alert("회원 목록을 불러오는 데 실패했습니다.");
                console.error(err);
            }
        };
        loadMembers();
    }, [page]);

    return (
        <>
            <div className="max-w-3xl mx-auto p-4">
                <h1 className="p-14 bg-white rounded shadow text-3xl font-semibold mb-10">
                    회원 목록
                </h1>

                <div className="p-4 bg-white rounded shadow !text-left mt-10 mb-10">
                    <ul>
                        {members.length === 0 ? (
                            <li>회원이 없습니다.</li>
                        ) : (
                            members.map((member) => <MembersItem key={member.id} member={member} />)
                        )}
                    </ul>
                </div>
                <Pagination page={page} onPageChange={setPage} totalPages={totalPages} />
            </div>
        </>

    );
}
