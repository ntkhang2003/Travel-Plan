import React, {useState, useRef} from 'react';
import axios from "axios"
import {Link} from "react-router-dom"
import "./login.css"
const Login = ({myStorage}) => {
    const userRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        try {
            const res = await axios.post("/api/users/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            myStorage.setItem('user', res.data.username)
            myStorage.setItem('userId', res.data._id)
            res.data && window.location.replace('/')
        } catch (err) {
            setError(true)
        }
    };
    return (
        <div style={{ backgroundColor: "#00142A", height: "100vh" }}>
            <form className="container" name="validateForm" onSubmit={handleSubmit}>

                <div className="form_background">
                    <div className="login">
                        <h1 className="login-title">Travel Plan</h1>
                        <div>
                            <div className="username">
                                <input type="text" placeholder="Tài khoản" name="uname" className="username-title" id="uname" required ref={userRef}></input>
                            </div>

                            <div className="password">
                                <input type="password" placeholder="Mật khẩu" name="password" className="password-input" id="" required ref={passwordRef}/>
                            </div>
                        </div>

                        {error && <p className="login-error">Sai tài khoản hoặc mật khẩu</p>} 
                        <div className="button">
                            <button type="submit" className="loginbutton">Đăng nhập</button>
                            <div className="signup">
                                <h4 className="signup-question"> Bạn chưa có tài khoản? <span className="signupspan"><Link to="/register">Đăng ký</Link></span></h4>
                            </div>

                        </div>

                    </div>
                </div>

            </form>
        </div>

        
    );
};

export default Login;