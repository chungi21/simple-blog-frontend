import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostDetail } from '../api/postApi';
import PostActions from '../components/PostActions';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostDetail(id)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!post) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>
        {post.title} <PostActions postId={post.id} authorEmail={post.member.email} />
      </h2>

      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;
