import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { loginUser } from "../api/memberApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser({ email, password });
      navigate("/");
    } catch (err) {
      alert("로그인 실패입니다. 이메일과 비밀번호를 확인해주세요.");
      console.error("로그인 에러:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-3 !text-left">로그인</h2>
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
