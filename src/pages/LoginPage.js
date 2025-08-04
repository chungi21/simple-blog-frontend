// pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { customFetch } from "../utils/request";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await customFetch("http://localhost:9000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        raw: true, // 헤더 접근이 필요한 경우 raw: true
      });

      const accessToken = res.headers.get("Authorization");

      const token = accessToken?.startsWith("Bearer ")
        ? accessToken.slice(7)
        : accessToken;

      if (!token) {
        throw new Error("AccessToken 누락");
      }

      localStorage.setItem("accessToken", token);

      navigate("/");
    } catch (err) {
      alert("로그인 실패입니다. 이메일과 비밀번호를 확인해주세요.");
      console.error("로그인 에러:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-3">로그인</h2>
        <LoginForm
          email={email}
          password={password}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
}
