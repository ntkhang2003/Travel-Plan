import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Post from '../../components/post'
import './profile.css'
const Profile = ({ userId, currentUser,  setUserId, setCurrentUser}) => {
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/api/users/${userId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            const res1 = await axios.get(`/api/posts/${currentUser}`)
            setPosts(res1.data)
        }
        fetchPosts()
    }, [posts])
    return (
        <div className='profile'>   
            <div className='userInfo'>
                <div className="userPic"><img src={user.profilePic} alt='No profile pic'/></div>
                <div className='userText'>
                    <h1>{user.username}</h1>
                    <h3>{user.email}</h3>
                </div>
            </div>
            <div className='userPosts'>
                {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
            </div>
            
        </div>  
    );
};

export default Profile;