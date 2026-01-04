import React from 'react'

const SharePost = () => {
  return (
    <div>
        <button onClick={()=> 
           { navigator.clipboard.writeText(
                `http://localhost:3000/posts/${post._id}`
            )
            alert("Post link copied");
        }}> Share</button>
    </div>
  )
}

export default SharePost