import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Post from '../../components/post'
import './profile.css'
const Profile = ({currentUser, setCurrentUser, setUserId, userId}) => {
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get("/api/users/"+userId)
            setUser(res.data)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            const res1 = await axios.get("/api/posts/" + user.username)
            setPosts(res1.data)
        }
        fetchPosts()
    }, [posts])
    const myStorage = window.localStorage
    const [place, setPlace] = useState("")
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            username: user.username,
            place,
            desc,
            photo: img,
        }
        try {
            const res2 = await axios.post("/api/posts", newPost)
            setPosts(res2.data)
        } catch (err) {}
    }
    const handleLogout = () => {
		myStorage.removeItem('user')
		myStorage.removeItem('userId')
		setCurrentUser(null)
		setUserId(null)
	}
    return (
        <div>   
            <h1>Profile</h1>
            <img src={user.profilePic}/>
            <h1 className='username'>{user.username}</h1>
            <h3>{user.email}</h3>
            {currentUser && <button className="button logout" onClick={handleLogout}>Logout</button>}
            {posts.map((p) => (
                <Post key={p._id} post={p}/>
            ))}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="place" onChange={e => setPlace(e.target.value)}></input>
                <textarea type="text" placeholder="desc" onChange={e => setDesc(e.target.value)}></textarea>
                <input type="text" placeholder="img" onChange={e => setImg(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>  
    );
};

export default Profile;