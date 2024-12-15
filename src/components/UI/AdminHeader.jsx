import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from '../../images/logo.png';
import userImg from '../../images/avatar.jpg';
import './AdminHeader.css';

const AdminHeader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = (e) => {
        e.preventDefault(); 
        setDropdownOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        navigate('/login'); 
    };

    return (
        <div className="header">
            <div className="header-left">
                <a href="index.html" className="logo">
                    <img src={logo} alt="Logo" />
                </a>
            </div>
            <a id="toggle_btn">
                <i className="fe fe-text-align-left"></i>
            </a>
            <a className="mobile_btn" id="mobile_btn">
                <i className="fa fa-bars"></i>
            </a>
            <ul className="nav user-menu">
                <li className="nav-item dropdown noti-dropdown">
                    <div className="dropdown-menu notifications">
                    </div>
                </li>
                <li className="nav-item dropdown has-arrow">
                    <a 
                        href="#" 
                        className="dropdown-toggle nav-link" 
                        onClick={toggleDropdown}
                    >
                        <span className="user-img"><img className="rounded-circle" src={userImg} width="31" alt="Ryan Taylor" /></span>
                    </a>
                    <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                        <div className="user-header">
                            <div className="avatar avatar-sm">
                                <img src={userImg} alt="" className="avatar-img rounded-circle" />
                            </div>
                            <div className="user-text">
                                <h6>Admin</h6>
                                <p className="text-muted mb-0">Administrator</p>
                            </div>
                        </div>
                        <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default AdminHeader;
