import React , {useState, useEffect} from 'react';
import Post from '../../components/post/index'
import axios from "axios"
const Community = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/api/posts")
            setPosts(res.data)
        };
        fetchPosts()    
    }, [])
    const [place, setPlace] = useState("")
    const [search, setSearch] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res1 = await axios.get(`/api/posts/${place}`)
            setSearch(res1.data)
        } catch (err) {}
    }
    return (
        <div className='community'>
            {posts.map((p) => (
                <Post key={p._id} post={p}/>
            ))}
        </div>
    );
};

export default Community;