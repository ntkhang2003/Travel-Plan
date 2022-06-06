import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/home'
import Community from '../pages/community'
import Details from '../pages/details'
import Help from '../pages/help'
import Login from '../pages/login'
import Register from '../pages/register'
import Service from '../pages/service'
import About from '../pages/about'
import Profile from '../pages/profile'
import SinglePost from '../pages/singlePost'

const Router = () => {
    const myStorage = window.localStorage
	const [currentUser, setCurrentUser] = useState(myStorage.getItem('user'))
    const [userId, setUserId] = useState(myStorage.getItem('userId'))
    return (
        <Routes>
            <Route path='/' element={
                <Home 
                    currentUser={currentUser}
                    userId={userId}
                />}
            />
            <Route path='/community' element={<Community />} />
            <Route path='/singlePost' element={
                <SinglePost 
                    currentUser={currentUser}
                />} 
            />
            <Route path='/details' element={<Details />} />
            <Route path='/help' element={<Help />} />
            <Route path='/login' element={
                <Login 
                    setUserId={setUserId}
                    setCurrentUser={setCurrentUser}
                    myStorage={myStorage}
                />} 
            />
            <Route path='/register' element={<Register />} />
            <Route path='/service' element={<Service />} />
            <Route path='/about' element={<About />} />
            <Route path='/profile' element={currentUser ? 
                (<Profile
                    userId={userId}
                    currentUser={currentUser}
                    setUserId={setUserId}
                    setCurrentUser={setCurrentUser}
                />) 
                : 
                (<Login
                    setUserId={setUserId}
                    setCurrentUser={setCurrentUser}
                    myStorage={myStorage}
                />)}/>
        </Routes>
    );
};

export default Router;