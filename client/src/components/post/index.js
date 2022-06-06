import './post.css'
import React, { useState } from 'react'
import axios from 'axios'
const Post = ({post}) => {
    const myStorage = window.localStorage
    const [postId, setPostId] = useState("")
    const username = myStorage.getItem('user')
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${post._id}`) 
            window.location.reload(true)
        } catch (err) {}
    }
    const handleUpdate = async () => {
        window.location.replace('/singlePost')
        setPostId(post._id)
    };
    return (
        <div className="post">
            <div className='postUsername'>
                {post.username}
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <img className="postImg" src={post.photo} alt="No images" />
            <div className="postInfo">
                <span className="postPlace">
                    {post.place} 
                    {username === post.username && (
                        <div className='singlePostEdit'>
                            <i className="singlePostUpdate far fa-edit" onClick={handleUpdate}></i>
                            <i className="singlePostDelete far fa-trash-alt" onClick={handleDelete}></i>
                        </div>
                        )}
                </span>
                <p className="postDesc">{post.desc}</p>
            </div>  
        </div>
    )
}
export default Post