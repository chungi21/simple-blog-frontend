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
      <input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} required />
      <input type="text" placeholder="닉네임" value={nickname} onChange={onChangeNickname} required />
      <input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} required />
      <button type="submit">{submitText}</button>
    </form>
  );
}
