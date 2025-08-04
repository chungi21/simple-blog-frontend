import React, { useEffect, useState } from "react";
import MemberForm from "../components/MemberForm";
import { fetchCurrentUser } from "../api/memberApi";
import axios from "axios";

export default function MyPage() {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState(""); // 비밀번호는 변경 시에만 사용
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCurrentUser()
            .then((res) => {
                const data = res.data;
                setEmail(data.email);
                setNickname(data.nickname);
                setLoading(false);
            })
            .catch((err) => {
                alert("회원 정보를 불러오는 데 실패했습니다.");
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("accessToken");
            await axios.put(
                "http://localhost:9000/api/member/me",
                {
                    nickname,
                    password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                }
            );

            alert("회원정보가 수정되었습니다!");
        } catch (err) {
            console.error(err);
            alert("회원정보 수정 실패");
        }
    };

    if (loading) return <p>로딩 중...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-3 !text-left">회원정보 수정</h2>
                <MemberForm
                    email={email}
                    nickname={nickname}
                    password={password}
                    onChangeEmail={() => { }}
                    onChangeNickname={(e) => setNickname(e.target.value)}
                    onChangePassword={(e) => setPassword(e.target.value)}
                    onSubmit={handleSubmit}
                    submitText="수정"
                />
            </div>
        </div>
    );
}
