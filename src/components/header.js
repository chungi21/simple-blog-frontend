import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isLoggedIn, saveCurrentUserEmail, saveCurrentUserId, } from "../utils/auth";
import { fetchCurrentUser } from "../api/memberApi";

export default function Header() {
    const [login, setLogin] = useState(isLoggedIn());
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();
    const [user, setUser] = useState(null);

    // Islogin
    useEffect(() => {
        setLogin(isLoggedIn());
        setShowMobileMenu(false);
    }, [location]);

    // logout 
    const handleLogout = async () => {
        try {
            await fetch("/logout", {
                method: "POST",
                credentials: "include", // 쿠키 기반 인증 시 필수
            });
            localStorage.removeItem("accessToken");
            setLogin(false);
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    // my info(내 블로그로 가기위해 정보 가져옴)
    useEffect(() => {
        if (isLoggedIn()) {
            fetchCurrentUser()
                .then((res) => {
                    if (res.resultCode === "OK") {
                        setUser(res.data);
                        saveCurrentUserEmail(res.data.email);
                        saveCurrentUserId(res.data.id);
                    }
                })
                .catch((error) => {
                    setUser(null);
                });
        }
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
                                <Link to="/posts/create" onClick={() => setShowMobileMenu(false)}>글 쓰기</Link>
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
