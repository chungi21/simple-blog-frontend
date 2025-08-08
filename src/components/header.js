// Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import {
    isLoggedIn,
    saveCurrentUserEmail,
    saveCurrentUserId,
    refreshAccessToken,
    logout
} from "../utils/auth";

import { fetchCurrentUser } from "../api/memberApi";

export default function Header() {
    const [login, setLogin] = useState(isLoggedIn());
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setLogin(isLoggedIn());
        setShowMobileMenu(false);
    }, [location]);

    const handleLogout = async () => {
        try {
            await logout();
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
                        {user && <Link to={`/posts?email=${user.email}`}>내 블로그</Link>}
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
                                        to={`/posts?email=${user.email}`}
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
