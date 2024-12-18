import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section id="hero" className="d-flex align-items-center hero-text">
            <div className="container d-flex flex-column-reverse flex-md-row align-items-center">
                <div className="content text-md-start text-center">
                    <h1>Your Health.<br />Your Terms.<br />Your Doctor.</h1>
                    <div className="d-flex justify-content-center justify-content-md-start gap-2">
                        <Link to={'/doctors'} className="btn-get-started scrollto">Get Started</Link>
                        <Link to={'/track-appointment'} className="btn-get-started scrollto">Track Appointment</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
