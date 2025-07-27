import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { useEffect, useState, useRef } from "react";

export default function ProtectedRoute({ children }) {
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const alreadyAlertedRef = useRef(false); // ⭐️ 알림 중복 방지용 ref

  useEffect(() => {
    const auth = isLoggedIn();

    if (!auth) {
      if (!alreadyAlertedRef.current) {
        alert("로그인이 필요합니다.");
        alreadyAlertedRef.current = true; // 다음에는 alert 안 뜨게 함
      }
      setLoggedIn(false);
    }

    setChecked(true);
  }, []);

  if (!checked) return null;
  if (!loggedIn) return <Navigate to="/login" replace />;

  return children;
}
