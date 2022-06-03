import './post.css'
import React, { useState } from 'react'
import axios from 'axios'
const Post = ({post}) => {
    const myStorage = window.localStorage
    const username = myStorage.getItem('user')
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${post._id}`) 
            window.location.reload()
        } catch (err) {}
    }
    // const [place, setPlace] = useState("")
    // const [desc, setDesc] = useState("")
    // const [img, setImg] = useState("")
    // const handleUpdate = async () => {
    //     try {
    //       await axios.put(`/api/posts/${post._id}`, {
    //         username,
    //         place,
    //         desc,
    //         photo: img
    //       });
    //     } catch (err) {}
    // };
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
                            <i className="singlePostIcon far fa-edit"></i>
                            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                        </div>
                        )}
                </span>
                <p className="postDesc">{post.desc}</p>
            </div>  
        </div>
    )
}
export default Post