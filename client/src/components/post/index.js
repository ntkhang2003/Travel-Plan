import './post.css'
import React, { useState } from 'react'
import axios from 'axios'
const Post = ({post}) => {
    const myStorage = window.localStorage
    const username = myStorage.getItem('user')
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${post._id}`) 
            window.location.replace('/profile')
        } catch (err) {}
    }
    const handleUpdate = async () => {
        myStorage.setItem('postId', post._id)
        window.location.replace('/write')
    }
    return (
        <div className="post">
            <div className='postUsername'>
                {post.username}
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <img className="postImg" src={post.photo} alt="No images" />
            <div className="postInfo">
                <p className="postPlace">
                    {post.place} 
                    {username === post.username && (
                        <div className='singlePostEdit'>
                            <i className="singlePostUpdate far fa-edit" onClick={handleUpdate}></i>
                            <i className="singlePostDelete far fa-trash-alt" onClick={handleDelete}></i>
                        </div>
                        )}
                </p>
                <p className="postDesc">{post.desc}</p>
            </div>  
        </div>
    )
}
export default Post