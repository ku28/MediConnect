import React from 'react'
import './index.css';
import img from '../../../images/chair.png'

const Location = () => {
    return (
        <div className="location-list ">
            {
                Array(1).fill(null).map((_item, index) => (
                    <div className='shadow p-3 border-0 mb-3' key={index}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="clinic-content">
                                    <h4 className="clinic-name" style={{ color: '#50C878' }}><a href="#">Care Center</a></h4>
                                    <p className="doc-speciality">MBBS</p>
                                    <div className="clinic-details mb-0">
                                        <h5 className="clinic-direction"> <i className="fas fa-map-marker-alt"></i>India</h5>
                                        <button className="btn btn-primary mt-2 mb-3" style={{ backgroundColor: '#50C878', borderColor: 'transparent' }}>Get Directions</button>
                                        <ul>
                                            {
                                                Array(3).fill(null).map((_item, index) => (
                                                    <li key={index + 2}>
                                                        <a>
                                                            <img src={img} alt="Feature Image" />
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="clinic-timing">
                                    <div>
                                        <p className="timings-days">
                                            <span> Mon - Sat </span>
                                        </p>
                                        <p className="timings-times">
                                            <span>10:00 AM - 2:00 PM</span>
                                            <span>4:00 PM - 9:00 PM</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="timings-days">
                                            <span>Sun</span>
                                        </p>
                                        <p className="timings-times">
                                            <span>10:00 AM - 2:00 PM</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="consult-price">
                                    ₹250
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Location