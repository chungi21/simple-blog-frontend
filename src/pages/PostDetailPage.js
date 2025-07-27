import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams()  // URL의 :id 값을 가져옴
  const [post, setPost] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:9000/api/posts/${id}`)
      .then(res => {
        setPost(res.data.data)  // CmResDTO의 data 필드에 실제 게시물 정보가 담겨 있음
      })
      .catch(err => {
        console.error(err)
      })
  }, [id])

  if (!post) return <p>로딩 중...</p>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  )
}

export default PostDetail
