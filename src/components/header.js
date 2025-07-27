import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

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

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">SimpleBlog</Link>
            </div>

            <nav className="nav desktop-menu">
                {login ? (
                    <>
                        <Link to="/mypage">내 정보</Link>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
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
                                <Link to="/signup" onClick={() => setShowMobileMenu(false)}>
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
