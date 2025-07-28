import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from "./pages/PostCreatePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PostListPage from './pages/PostListPage';
import Header from './components/header';
import './App.css';

function App() {

  const isLogin = !!localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* 전체 조회 */}
          <Route path="/posts" element={<PostListPage />} />

          {/* 이메일로 필터된 조회 */}
          <Route path="/posts/email/:email" element={<PostListPage />} />

          <Route path="/posts/:id" element={<PostDetailPage />} />

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
