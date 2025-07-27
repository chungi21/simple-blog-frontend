import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from "./pages/PostCreatePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
  )
}

export default App;
