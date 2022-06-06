import './singlePost.css'
import React, { useState } from 'react'
// import Post from '../../components/post/index'
import axios from "axios"
const SinglePost = ({currentUser}) => {
    const [place, setPlace] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            username: currentUser,
            place: place,
            desc: desc,
            photo: photo,
        }
        try {
            await axios.post("/api/posts", newPost)
            window.location.replace('/profile')
        } catch (err) {}
    }
    return (
        <div className='singlePost' onSubmit={handleSubmit}>
            <form>
                <input type="text" placeholder="Nhập địa điểm" onChange={e => setPlace(e.target.value)}></input>
                <textarea type="text" placeholder="Nhập mô tả" onChange={e => setDesc(e.target.value)}></textarea>
                <input type="text" placeholder="Dán link hình" onChange={e => setPhoto(e.target.value)}></input>
                <button type="submit">Thêm bài viết</button>
            </form>
        </div>
    )
}

export default SinglePost