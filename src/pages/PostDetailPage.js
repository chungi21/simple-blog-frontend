import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostDetail } from '../api/postApi';
import PostActions from '../components/PostActions';
import { isLoggedIn } from '../utils/auth';
import CommentList from "../components/CommentList";
import CommentForm from '../components/CommentForm';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPostDetail(id)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('accessToken');

      const response = await axios.post(
        'http://localhost:9000/api/comments',
        {
          postId: parseInt(id),
          content: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      alert('댓글이 등록되었습니다!');
    } catch (err) {
      console.error(err);
      alert('댓글 등록 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>
        {post.title}{' '}
        <PostActions postId={post.id} authorEmail={post.member.email} />
      </h2>
      <p>{post.content}</p>

      <hr />

      <h3>댓글 작성</h3>
      {isLoggedIn() ? (
        <CommentForm
          postId={post.id}
          onSuccess={() => window.location.reload()} // 댓글 등록 후 새로고침
        />
      ) : (
        <p>로그인 후 댓글을 작성할 수 있습니다.</p>
      )}

      <CommentList postId={post.id} />
    </div>
  );
}

export default PostDetail;
