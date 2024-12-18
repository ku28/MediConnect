import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section id="hero" className="d-flex align-items-center hero-text">
            <div className="container d-flex flex-column-reverse flex-md-row align-items-center">
                <div className="content text-md-start text-center">
                    <h1 
                        style={{
                            fontSize: '3.5rem',
                            fontWeight: '700',
                            color: '#333',
                            lineHeight: '1.2',
                            marginBottom: '15px',
                            textTransform: 'capitalize',
                        }}
                    >
                        Find Trusted Doctors, <br />
                        Anytime, Anywhere
                    </h1>
                    <p 
                        style={{
                            fontSize: '1.2rem',
                            fontWeight:"bold",
                            color: '#555',
                            lineHeight: '1.6',
                            marginBottom: '20px',
                        }}
                    >
                        Get the right care, right away.
                    </p>
                    <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
                        <Link 
                            to={'/doctors'} 
                            style={{
                                display: 'inline-block',
                                padding: '12px 25px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                textDecoration: 'none',
                                borderRadius: '25px',
                                textTransform: 'uppercase',
                                color: '#fff',
                                backgroundColor: '#50C878',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#0e783c'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#50C878'}
                        >
                            Get Started
                        </Link>
                        <Link 
                            to={'/track-appointment'} 
                            style={{
                                display: 'inline-block',
                                padding: '12px 25px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                textDecoration: 'none',
                                borderRadius: '25px',
                                textTransform: 'uppercase',
                                color: '#50C878',
                                backgroundColor: '#fff',
                                border: '2px solid #50C878',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#50C878';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#fff';
                                e.target.style.color = '#50C878';
                            }}
                        >
                            Track Appointment
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;