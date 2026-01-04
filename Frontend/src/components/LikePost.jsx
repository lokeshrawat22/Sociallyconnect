import React from 'react'
import API from '../api'

const LikePost = () => {

    const likePost = async (id) => {
    await API.put(`/auth/posts/${id}/like`);
    fetchPosts();
  return (
   <div>
        <button onClick={()=> likePost(post._id)}>like{post.likes.length}</button>
    </div>
  )
} }

export default LikePost

