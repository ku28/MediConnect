

import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container d-flex flex-column-reverse flex-md-row align-items-center">
                <div className="content text-md-start text-center">
                    <h1>Making Health <br />Care Better Together</h1>
                    <p>
                    Health is the foundation of a fulfilling life. It is not just the absence of illness, but a state of complete physical, mental, and emotional well-being. When we prioritize our health, we empower ourselves to live with energy, purpose, and resilience.
                    </p>
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
