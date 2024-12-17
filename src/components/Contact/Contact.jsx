// Updated Contact Component
import React, { useEffect } from 'react';
import Footer from '../Shared/Footer/Footer';
import { useForm } from 'react-hook-form';
import { FaLocationArrow, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Header from '../Shared/Header/Header';
import './index.css';
import SubHeader from '../Shared/SubHeader';
import { useContactMutation } from '../../redux/api/contactApi';
import { message } from 'antd';

const Contact = () => {
    const [contact, { isLoading, isError, error, isSuccess }] = useContactMutation();
    const { register, handleSubmit, reset } = useForm({});

    const onSubmit = (data) => {
        contact(data);
        reset();
    };

    useEffect(() => {
        if (isSuccess) {
            message.success("Message sent successfully!");
        }
        if (isError && error) {
            message.error(error?.data?.message);
        }
    }, [isSuccess, isError, error]);

    return (
        <>
            <Header />
            <SubHeader title="Contact Us" subtitle="We'd love to hear from you! Reach out to us anytime." />
            <section id="contact" className="contact mt-5 mb-5">
                <div className="container-fluid px-3" style={{ marginTop: 80, marginBottom: 120 }}>
                    <div className="row gy-5 align-items-center">

                        <div className="col-lg-4">
                            <div className="info rounded p-4 shadow">
                                <div className="d-flex align-items-center mb-4">
                                    <FaLocationArrow className='icon' />
                                    <div className="ms-3">
                                        <h4>Location:</h4>
                                        <p>123 Health Street, MediCity,Gurugram</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center mb-4">
                                    <FaEnvelope className='icon' />
                                    <div className="ms-3">
                                        <h4>Email:</h4>
                                        <p>mediconnect@gmail.com.com</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <FaPhoneAlt className='icon' />
                                    <div className="ms-3">
                                        <h4>Call:</h4>
                                        <p>+91 76231-45201</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="form-wrapper p-4 rounded shadow">
                                <form className="row form-row g-3" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input required {...register("firstName")} className="form-control" placeholder="First Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input required {...register("lastName")} className="form-control" placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input required {...register("email")} type="email" className="form-control" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Subject</label>
                                            <input required {...register("subject")} className="form-control" placeholder="Enter your subject" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Message</label>
                                            <textarea required {...register("text")} className="form-control" rows="5" placeholder="Enter your message"></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button disabled={isLoading} type="submit" className="btn btn-success">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;