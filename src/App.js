import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  )
}

export default App;
