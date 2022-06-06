import React, {useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './register.css'
const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("/api/users/register", {
                username,
                email,
                password,
            })
            res.data && window.location.replace("/login");
            } catch (err) {
                setError(true)
            }
        }
    return (
        <div style={{ backgroundColor: "#00142A", height: "100vh" }}>
            <form className="container" name="validateForm" onSubmit={handleSubmit}>

                <div className="form_background">
                    <div className="login">
                        <h1 className="login-title">Travel Plan</h1>
                        <div>
                            <div className="username">
                                <input type="text" placeholder="Tài khoản" name="uname" className="username-title" id="uname" required onChange={(e) => setUsername(e.target.value)}></input>
                            </div>

                            <div className="email">
                                <input type="text" placeholder="Email" name="email" className="email-title" id="uname" required onChange={(e) => setEmail(e.target.value)}></input>
                            </div>

                            <div className="password">
                                <input type="password" placeholder="Mật khẩu" name="password" className="password-input" id="" required onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                            
                        </div>

                        {error & <p className="error">Tạo tài khoản không thành công</p>}
                        <div className="button">
                            <button type="submit" className="loginbutton">Đăng ký</button>
                            <div className="signup">
                                <h4 className="signup-question">Bạn đã có tài khoản? <span className="signupspan"><Link to='/login'>Đăng nhập</Link></span></h4>
                            </div>

                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
};

export default Register;