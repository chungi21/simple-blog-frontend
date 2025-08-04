import React from "react";

export default function MemberForm({
  email,
  nickname,
  password,
  onChangeEmail,
  onChangeNickname,
  onChangePassword,
  onSubmit,
  submitText = "가입",
}) {
  return (
    <form onSubmit={onSubmit}>
      <label><strong>이메일</strong>
        <input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} required className="border border-[#eee] rounded-[10px] mb-[15px] hover:bg-gray-50 p-1 block w-full" />
      </label>
      <label><strong>닉네임</strong>
        <input type="text" placeholder="닉네임" value={nickname} onChange={onChangeNickname} required className="border border-[#eee] rounded-[10px] mb-[15px] hover:bg-gray-50 p-1 block w-full" />
      </label>
      <label><strong>비밀번호</strong>
        <input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} className="border border-[#eee] rounded-[10px] mb-[15px] hover:bg-gray-50 p-1 block w-full" />
      </label>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{submitText}</button>
    </form>
  );
}
