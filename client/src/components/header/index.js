import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/img/logo.png';
import userIcon from '../../assets/img/user.png';
import './header.css';


const Header = () => {
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
                                        <Link to="/community">Community</Link>
                                    </li>
                                    <li className='header__nav-list-item'>
                                        <Link to="/details">Details</Link>
                                    </li>
                                    <li className='header__nav-list-item'>
                                        <Link to="/service">Service</Link>
                                    </li>
                                    <li className='header__nav-list-item'>
                                        <Link to="/help">Help</Link>
                                    </li>
                                    <li className='header__nav-list-item'>
                                        <Link to="/about">About</Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className='header__login'>
                                <Link to="/profile">
                                    <img
                                        src={userIcon}
                                        alt="user-icon"
                                        width={30}
                                        height={30}
                                    />
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Header;