import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from "./pages/PostCreatePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PostListPage from './pages/PostListPage';
import PostEditPage from "./pages/PostEditPage";
import JoinPage from './pages/JoinPage';
import MyPage from './pages/MyPage';
import Header from './components/header';
import MainPage from './pages/MainPage';
import './App.css';

function App() {

  const isLogin = !!localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>

          <Route path="/" element={<MainPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/join" element={<JoinPage />} />

          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />

          {/* 전체 조회 */}
          <Route path="/posts" element={<PostListPage />} />

          {/* 이메일로 필터된 조회 */}
          <Route path="/posts/email/:email" element={<PostListPage />} />

          <Route path="/posts/:postId" element={<PostDetailPage />} />

          <Route
            path="/posts/:id/form"
            element={
              <ProtectedRoute>
                <PostEditPage />
              </ProtectedRoute>
            } />

          <Route
            path="/posts/create"
            element={
              <ProtectedRoute>
                <PostCreatePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
