import React, {useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/img/logo.png'
import userIcon from '../../assets/img/user.png'
import './header.css';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Header = () => {
    const myStorage = window.localStorage
    const [currentUser, setCurrentUser] = useState(myStorage.getItem('user'))
    const [userId, setUserId] = useState(myStorage.getItem('userId'))
    const handleLogout = () => {
		myStorage.removeItem('user')
		myStorage.removeItem('userId')
        setCurrentUser(null)
        setUserId(null)
        window.location.replace('/login')
	}
    const { height, width } = useWindowDimensions();

    return (
        <div className='header'>
            <Container className='fluid'>
                <Row className='justify-content-between align-items-center'>
                    <Col md={3}>
                        <Link to="/" className='logo'>
                            <p className='logo__text'>TravelPlan</p>
                            <div className='logo__img'>
                                <img
                                    src={logoImg}
                                    alt='logo'
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </Link>
                    </Col>
                    <Col md={9}>
                        <div className='header__nav'>
                            <nav>
                                <ul className='header__nav-list'>
                                    <li className='header__nav-list-item'>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className='header__nav-list-item'>
                                        <Link to="/community">Community</Link>
                                    </li>
                                    <li className='header__nav-list-item'>
                                        <Link to="/singlePost">Write</Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className='header__nav-list header__login'>
                                <img
                                    src={userIcon}
                                    alt="user-icon"
                                    width={width*0.1}
                                    height={height*0.1}
                                />
                                <div className='header__nav-list-item-click'>
                                    <ul>
                                        <li className='header__nav-list-item-click header__profile'><Link to="/profile" onMouseEnter={{ background:'#00ffff' }}>Profile</Link></li>
                                        <li className='header__nav-list-item-click header__logout' onClick={handleLogout}>Logout</li>   
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Header;