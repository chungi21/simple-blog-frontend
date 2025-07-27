// pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("로그인 실패입니다. 이메일과 비밀번호를 확인해주세요.");
        return;
      }

      const accessToken = res.headers.get("Authorization"); 

      const token = accessToken?.startsWith("Bearer ")
        ? accessToken.slice(7)
        : accessToken;


      // AccessToken 저장
      localStorage.setItem("accessToken", token);

      // 이후 메인 페이지 등으로 이동
      navigate("/");
    } catch (err) {
      console.error("로그인 에러:", err);
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleLogin}
    />
  );
}
