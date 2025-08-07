import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchPostDetail } from '../api/postApi';
import { createComment } from '../api/commentApi';
import PostActions from '../components/PostActions';
import { isLoggedIn } from '../utils/auth';
import CommentList from "../components/CommentList";
import CommentForm from '../components/CommentForm';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const page = location.state?.page;

  useEffect(() => {
    fetchPostDetail(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      setIsSubmitting(true);
      await createComment({ postId: parseInt(postId), content: commentContent });
      alert("댓글이 등록되었습니다!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("댓글 등록 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) return <p>로딩 중...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-4">

        <div className="p-4 bg-white rounded shadow mb-[10px] !text-left">
          <div className="text-xl font-semibold mx-auto mb-[10px]">게시물 내용</div>

          <div className="mb-[10px] p-2">
            <strong>{post.title}{' '}</strong>
            <p>{post.content}</p>
          </div>
          <div className="flex justify-between items-center">
            {email && (
              <button
                onClick={() => navigate(`/posts/email/${email}?page=${page || 0}`)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                목록 보기
              </button>
            )}
            <PostActions postId={post.id} authorEmail={post.member.email} />
            
          </div>
        </div>

        {isLoggedIn() ? (
          <CommentForm
            postId={post.id}
            onSuccess={() => window.location.reload()}
          />
        ) : (
          <p>로그인 후 댓글을 작성할 수 있습니다.</p>
        )}

        <CommentList postId={post.id} />
      </div>
    </div>
  );
}

export default PostDetail;
