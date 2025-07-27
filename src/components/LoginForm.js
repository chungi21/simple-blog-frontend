export default function LoginForm({ email, password, onEmailChange, onPasswordChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="이메일"
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
    </form>
  );
}