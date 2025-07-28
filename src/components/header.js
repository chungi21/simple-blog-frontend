import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { fetchCurrentUser } from "../api/memberApi";

export default function Header() {
    const [login, setLogin] = useState(isLoggedIn());
    const [user, setUser] = useState(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();

    // 로그인 상태 체크
    useEffect(() => {
        setLogin(isLoggedIn());
        setShowMobileMenu(false);
    }, [location]);

    console.log("accessToken:", localStorage.getItem("accessToken"));

    // 로그인 유저 정보 가져오기
    useEffect(() => {
        fetchCurrentUser()
            .then((res) => {
                if (res.resultCode === "OK") {
                    console.log("user email:", res.data.email);
                    setUser(res.data);
                }
            })
            .catch((error) => {
                console.error("fetchCurrentUser error:", error);
                setUser(null);
            });
    }, [location]);


    const handleLogout = async () => {
        try {
            await fetch("/logout", {
                method: "POST",
                credentials: "include",
            });
            localStorage.removeItem("accessToken");
            setLogin(false);
            setUser(null);
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
                        {user && (
                            <Link to={`/posts/email/${user.email}`}>내 블로그</Link>
                        )}
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
                    <button
                        className="close-btn"
                        onClick={() => setShowMobileMenu(false)}
                    >
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
                                <Link
                                    to="/login"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    로그인
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setShowMobileMenu(false)}
                                >
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
