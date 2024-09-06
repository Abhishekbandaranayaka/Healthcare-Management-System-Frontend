import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import Notification from '../notification/notification'; // Import the Notification component

const NavBar = () => {
    // Define the state for toggling the notification
    const [showNotification, setShowNotification] = useState(false);

    return (
        <header>
            {/* Upper line: Logo, Search field, Social media icons */}
            <div className="upper-navbar d-flex justify-content-between align-items-center p-2 bg-light">
                <div className="logo">
                    <Link to="/">
                        <img src="/assets/logo.png" alt="Healthcare System" className="img-fluid" />
                    </Link>
                </div>
                <div className="search-bar d-flex justify-content-center align-items-center">
                    <input type="text" placeholder="Search..." className="form-control rounded-pill" />
                </div>
                <div className="social-icons d-flex align-items-center">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src="/assets/fb.png" alt="Facebook" className="img-fluid" /></a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src="/assets/insta.png" alt="Instagram" className="img-fluid" /></a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><img src="/assets/twitter.png" alt="Twitter" className="img-fluid" /></a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><img src="/assets/linkden.png" alt="LinkedIn" className="img-fluid" /></a>
                </div>
            </div>

            {/* Lower line: Navigation links */}
            <nav className="navbar navbar-expand-lg d-flex justify-content-between align-items-center bg-light navbar-lower">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">CONTACT</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/appointments">APPOINTMENTS</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">ABOUT US</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">SIGN UP</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">LOGIN</Link>
                            </li>
                        </ul>
                        <div className="notification-icon">
                            <button onClick={() => setShowNotification(!showNotification)} className="btn btn-link">
                                <img src="/assets/notification.png" alt="Notifications" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Conditional rendering of Notification component */}
            {showNotification && <Notification />}
        </header>
    );
};

export default NavBar;
