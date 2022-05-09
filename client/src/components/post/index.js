import './post.css'
import React, { useState } from 'react'
import axios from 'axios'
const Post = ({post}) => {
    const myStorage = window.localStorage
    const username = myStorage.getItem('user')
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${post._id}`) 
            window.location.replace('/community')
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
            <img className="postImg" src={post.photo} alt="" />
            <div className='postUsername'>{post.username}</div>
            <div className="postInfo">
                <div className="post">
                </div>
                <span className="postPlace">{post.place}</span>
                <hr />
                <p className="postDesc">{post.desc}</p>
            </div>  
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            {username === post.username && (<button type="submit" onClick= {handleDelete}>Delete</button>)}
        </div>
    )
}
export default Post