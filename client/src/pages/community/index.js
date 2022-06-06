import "./community.css"
import React , {useState, useEffect} from 'react';
import Post from '../../components/post/index'
import axios from "axios"
const Community = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/api/posts")
            setPosts(res.data)
        }
        fetchPosts()    
    }, [])
    const [place, setPlace] = useState("")
    const [search, setSearch] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res1 = await axios.get(`/api/posts/${place}`)
            setSearch(res1.data)
        } catch (err) {}
    }
    return (
        <div className='community'>
            <div className="searchFrame">
                <div className="search">
                    <form>
                        <input type="text" onChange={e => setPlace(e.target.value)}></input>
                        <button type="submit" onSubmit={handleSubmit}>Search<i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
            </div>
            

            <div className="posts">
                
                {search ? (search) : (posts).map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
                {/* {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))} */}
            </div>
        </div>
    )
}

export default Community