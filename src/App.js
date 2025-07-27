import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from "./pages/PostCreatePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PostListPage from './pages/PostListPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* 전체 조회 */}
        <Route path="/posts" element={<PostListPage />} />

        {/* 이메일로 필터된 조회 */}
        <Route path="/posts/:email" element={<PostListPage />} />

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
    </Router>
  );
}

export default App;
