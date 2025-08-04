export default function LoginForm({ email, password, onEmailChange, onPasswordChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label><strong className="!text-left block">이메일</strong>
        <input
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="이메일"
          className="border border-[#eee] rounded-[10px] mb-[15px] hover:bg-gray-50 p-1 block w-full"
        />
      </label>
      <label><strong className="!text-left block">비밀번호</strong>
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="비밀번호"
        className="border border-[#eee] rounded-[10px] mb-[15px] hover:bg-gray-50 p-1 block w-full"
      />
      </label>
      <div className="!text-right">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">로그인</button>
      </div>
    </form>
  );
}