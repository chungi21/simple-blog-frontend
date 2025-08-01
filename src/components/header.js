import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { customFetch } from "../utils/request";
import {
    isLoggedIn,
    saveCurrentUserEmail,
    saveCurrentUserId,
    refreshAccessToken, // 추가
} from "../utils/auth";
import { fetchCurrentUser } from "../api/memberApi";

export default function Header() {
    const [login, setLogin] = useState(isLoggedIn());
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();
    const [user, setUser] = useState(null);

    // 로그인 상태 업데이트
    useEffect(() => {
        setLogin(isLoggedIn());
        setShowMobileMenu(false);
    }, [location]);

    // 로그아웃
    const handleLogout = async () => {
        try {
            await customFetch("http://localhost:9000/logout", {
                method: "POST",
            });
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userId");
            Cookies.remove("refreshCookie", { path: "/" });
            setLogin(false);
            setUser(null);
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    // 내 정보 가져오기 전에 accessToken 재발급 시도
    useEffect(() => {
        const fetchUserWithRefresh = async () => {
            if (!isLoggedIn()) {
                const refreshed = await refreshAccessToken();
                if (!refreshed) {
                    setUser(null);
                    return;
                }
            }

            fetchCurrentUser()
                .then((res) => {
                    if (res.resultCode === "OK") {
                        setUser(res.data);
                        saveCurrentUserEmail(res.data.email);
                        saveCurrentUserId(res.data.id);
                    }
                })
                .catch(() => {
                    setUser(null);
                });
        };

        fetchUserWithRefresh();
    }, [location]);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">SimpleBlog</Link>
            </div>

            <nav className="nav desktop-menu">
                {login ? (
                    <>
                        {user && (
                            <Link to={`/posts/email/${user.email}`}>내 블로그</Link>
                        )}
                        <Link to="/posts/create">글 쓰기</Link>
                        <Link to="/mypage">내 정보</Link>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/join">회원가입</Link>
                    </>
                )}
            </nav>

            <div className="hamburger" onClick={() => setShowMobileMenu(true)}>
                ☰
            </div>

            {showMobileMenu && (
                <div className="mobile-menu">
                    <button className="close-btn" onClick={() => setShowMobileMenu(false)}>
                        ✕
                    </button>
                    <div className="mobile-menu-content">
                        {login ? (
                            <>
                                {user && (
                                    <Link
                                        to={`/posts/email/${user.email}`}
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        내 블로그
                                    </Link>
                                )}
                                <Link to="/posts/create" onClick={() => setShowMobileMenu(false)}>
                                    글 쓰기
                                </Link>
                                <Link to="/mypage" onClick={() => setShowMobileMenu(false)}>
                                    내 정보
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setShowMobileMenu(false);
                                    }}
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setShowMobileMenu(false)}>
                                    로그인
                                </Link>
                                <Link to="/join" onClick={() => setShowMobileMenu(false)}>
                                    회원가입
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
