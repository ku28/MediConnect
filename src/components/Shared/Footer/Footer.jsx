import React from 'react';
import './Footer.css';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer1 position-relative overflow-hidden">
			<div className="footer-top">
				<div className="container-fluid">
					<div className="row">
						{/* About Section */}
						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-about">
								<div className="footer-logo">
									<Link to={'/'}>
										<img src={logo} alt="MediConnect Logo" style={{ maxWidth: '160px' }} />
									</Link>
								</div>
								<div className="footer-about-content">
									<p className="form-text text-white">MediConnect is your trusted platform for connecting patients with expert doctors seamlessly and securely. Experience hassle-free healthcare access today.</p>
								</div>
							</div>
						</div>

						{/* For Patients Section */}
						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-menu">
								<h2 className="footer-title">For Patients</h2>
								<ul>
									<li><Link to={'/doctors'}><FaAngleDoubleRight className="icon" /> Search for Doctors</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className="icon" /> Login</Link></li>
									<li><Link to={'/register'}><FaAngleDoubleRight className="icon" /> Register</Link></li>
									<li><Link to={'/appointments'}><FaAngleDoubleRight className="icon" /> Book Appointments</Link></li>
									<li><Link to={'/dashboard'}><FaAngleDoubleRight className="icon" /> Patient Dashboard</Link></li>
								</ul>
							</div>
						</div>

						{/* For Doctors Section */}
						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-menu">
								<h2 className="footer-title">For Doctors</h2>
								<ul>
									<li><Link to={'/appointments'}><FaAngleDoubleRight className="icon" /> Manage Appointments</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className="icon" /> Login</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className="icon" /> Register</Link></li>
									<li><Link to={'/dashboard'}><FaAngleDoubleRight className="icon" /> Doctor Dashboard</Link></li>
								</ul>
							</div>
						</div>

						{/* Contact Us Section */}
						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-contact">
								<h2 className="footer-title">Contact Us</h2>
								<div className="footer-contact-info">
									<p>
										<i className="fas fa-map-marker-alt"></i>
										123 Health Street, MediCity, Gurugram
									</p>
									<p>
										<i className="fas fa-phone-alt"></i>
										+91 76231-45201
									</p>
									<p>
										<i className="fas fa-envelope"></i>
										mediconnect@gmail.com
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer Bottom */}
			<div className="footer-bottom">
				<div className="container-fluid">
					<div className="copyright">
						<div className="row">
							<div className="col-md-6 col-lg-6">
								<div className="copyright-text">
									<p className="mb-0">&copy; {new Date().getFullYear()} MediConnect. All Rights Reserved.</p>
								</div>
							</div>
							<div className="col-md-6 col-lg-6">
								<div className="copyright-menu">
									<ul className="policy-menu d-flex gap-3 justify-content-center">
										<Link to={'/terms'} className="text-white">Terms and Conditions</Link>
										<Link to={'/policy'} className="text-white">Privacy Policy</Link>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;