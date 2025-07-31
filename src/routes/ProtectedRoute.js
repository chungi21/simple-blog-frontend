import { Navigate } from "react-router-dom";
import { isLoggedIn, refreshAccessToken } from "../utils/auth";
import { useEffect, useState, useRef } from "react";

export default function ProtectedRoute({ children }) {
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const alreadyAlertedRef = useRef(false);

  useEffect(() => {
    const checkLogin = async () => {
      const auth = isLoggedIn();

      if (auth) {
        setLoggedIn(true);
        setChecked(true);
        return;
      }

      // AccessToken 없으면 Refresh 시도
      const refreshed = await refreshAccessToken();

      if (refreshed) {
        setLoggedIn(true);
      } else {
        if (!alreadyAlertedRef.current) {
          alert("로그인이 필요합니다.");
          alreadyAlertedRef.current = true;
        }
        setLoggedIn(false);
      }

      setChecked(true);
    };

    checkLogin();
  }, []);

  if (!checked) return null;
  if (!loggedIn) return <Navigate to="/login" replace />;

  return children;
}
