import React, { useState } from "react";
import MemberForm from "../components/MemberForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:9000/api/member/join", {
                email,
                nickname,
                password,
            });

            alert("회원가입 성공!");
            navigate("/login");
        } catch (err) {
            console.error(err);

            const message = err.response?.data?.message;

            if (message?.includes("Email")) {
                alert("이미 등록된 이메일입니다.");
            } else if (message?.includes("Nickname")) {
                alert("이미 사용 중인 닉네임입니다.");
            } else {
                alert("회원가입 실패");
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-3">회원가입</h2>
                <MemberForm
                    email={email}
                    nickname={nickname}
                    password={password}
                    role={role}
                    onChangeEmail={(e) => setEmail(e.target.value)}
                    onChangeNickname={(e) => setNickname(e.target.value)}
                    onChangePassword={(e) => setPassword(e.target.value)}
                    onSubmit={handleSubmit}
                    submitText="가입"
                />
            </div>
        </div>
    );
}
