import React, { useState } from "react";
import {
  checkEmailExists,
  checkNicknameExists
} from "../api/memberApi";

export default function MemberForm({
  mode = "join",
  email,
  nickname,
  password,
  onChangeEmail,
  onChangeNickname,
  onChangePassword,
  onSubmit,
  submitText = "가입"
}) {
  const [emailMsg, setEmailMsg] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = async (e) => {
    const value = e.target.value;
    onChangeEmail(e);

    if (!emailRegex.test(value)) {
      setEmailMsg("이메일 형식에 맞게 입력해주세요.");
      return;
    }

    try {
      const res = await checkEmailExists(value);
      console.log("res", res.resultMsg);
      setEmailMsg(
        res.resultMsg?.toLowerCase().includes("existence")
          ? "이미 사용 중인 이메일입니다."
          : "사용 가능한 이메일입니다."
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleNicknameChange = async (e) => {
    const value = e.target.value;
    onChangeNickname(e);

    try {
      const res = await checkNicknameExists(value);
      console.log("res.resultMsg : "+res.resultMsg);
      setNicknameMsg(
        res.resultMsg?.toLowerCase().includes("existence")
          ? "이미 사용 중인 닉네임입니다."
          : "사용 가능한 닉네임입니다."
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    onChangePassword(e);

    if (value.length < 4) {
      setPasswordMsg(
        mode === "join"
          ? "비밀번호는 4글자 이상 입력해주세요."
          : "변경을 원하시면 비밀번호는 4글자 이상 입력해주세요."
      );
    } else {
      setPasswordMsg("사용 가능한 비밀번호입니다.");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (mode === "join") {
      if (!emailRegex.test(email)) {
        alert("이메일 형식에 맞게 입력해주세요.");
        return;
      }
      if (emailMsg.includes("이미 사용")) {
        alert("이미 사용 중인 이메일입니다.");
        return;
      }
    }

    if (nicknameMsg.includes("이미 사용")) {
      alert("이미 사용 중인 닉네임입니다.");
      return;
    }

    if (mode === "join" && password.length < 4) {
      alert("비밀번호는 4글자 이상 입력해주세요.");
      return;
    }
    if (mode === "edit" && password.length > 0 && password.length < 4) {
      alert("비밀번호는 4글자 이상 입력해주세요.");
      return;
    }

    onSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        <strong className="!text-left block">이메일</strong>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmailChange}
          required={mode === "join"}
          disabled={mode === "edit"}
          className="border border-[#eee] rounded-[10px] mb-[5px] hover:bg-gray-50 p-1 block w-full"
        />
      </label>
      <div
        id="email-check"
        className={
          emailMsg.includes("형식에") || emailMsg.includes("이미 사용")
            ? "text-red-500 text-left"
            : "text-black text-left"
        }
      >
        {emailMsg}
      </div>

      <label>
        <strong className="!text-left block mt-[15px]">닉네임</strong>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={handleNicknameChange}
          required
          className="border border-[#eee] rounded-[10px] mb-[5px] hover:bg-gray-50 p-1 block w-full"
        />
      </label>
      <div
        id="nickname-check"
        className={
          nicknameMsg.includes("이미 사용")
            ? "text-red-500 text-left"
            : "text-black text-left"
        }
      >
        {nicknameMsg}
      </div>

      <label>
        <strong className="!text-left block mt-[15px]">비밀번호</strong>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          required={mode === "join"}
          className="border border-[#eee] rounded-[10px] mb-[5px] hover:bg-gray-50 p-1 block w-full"
        />
      </label>
      <div
        id="password-check"
        className={
          passwordMsg.includes("4글자")
            ? "text-red-500 text-left"
            : "text-black text-left"
        }
      >
        {passwordMsg}
      </div>

      <div className="!text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
