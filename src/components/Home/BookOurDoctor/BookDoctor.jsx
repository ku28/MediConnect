import React, { useEffect } from 'react';
import './BookDoctor.css';
import { Link } from 'react-router-dom';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { FaCheckCircle, FaRegHeart } from "react-icons/fa";
import { useAddFavouriteMutation } from '../../../redux/api/favouriteApi';
import { message } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import defaultDoctorImage from "../../../images/img/default-doctor.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const BookDoctor = () => {
    const { data, isError, isLoading } = useGetDoctorsQuery({ limit: 10 });
    const doctors = data?.doctors || [];
    const defaultImage = defaultDoctorImage;

    const [addFavourite, { isSuccess, isLoading: FIsLoading, isError: fIsError, error }] = useAddFavouriteMutation();

    const handleAddFavourite = (id) => {
        addFavourite({ doctorId: id });
    };

    useEffect(() => {
        if (!FIsLoading && fIsError) {
            message.error(error?.data?.message || 'Error occurred');
        }
        if (isSuccess) {
            message.success('Successfully added to favourites');
        }
    }, [isSuccess, fIsError, FIsLoading, error]);

    // Remove duplicate doctors if any
    const uniqueDoctors = Array.from(new Set(doctors.map(a => a.id)))
        .map(id => doctors.find(a => a.id === id));

    // Render slides or empty message
    let content = null;

    if (!isLoading && isError) {
        content = <div>Something Went Wrong!</div>;
    } else if (!isLoading && uniqueDoctors.length === 0) {
        content = <div>No doctors available</div>;
    } else {
        content = (
            <>
                {uniqueDoctors.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="profile-widget shadow-sm">
                            <div className="doc-img position-relative">
                                <Link to={`/doctors/profile/${item.id}`}>
                                    <img
                                        className="img-fluid"
                                        alt="Doctor"
                                        src={item.img || defaultImage}
                                        style={{ width: '100%', height: '200px', objectFit: 'fill' }}
                                    />
                                </Link>
                                <a
                                    className="heart-icon position-absolute top-0 end-0 p-2"
                                    onClick={() => handleAddFavourite(item.id)}
                                    style={{ cursor: 'pointer', color: '#f00', fontSize: '1.2rem' }}
                                >
                                    <FaRegHeart />
                                </a>
                            </div>
                            <div className="pro-content" style={{ padding: '10px' }}>
                                <h3 className="title mb-2" style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                                    <Link to={`/doctors/profile/${item.id}`}>
                                        {item.firstName} {item.lastName}
                                    </Link>
                                    <FaCheckCircle className="verified" style={{ color: '#28a745', marginLeft: '5px' }} />
                                </h3>
                                {item.designation && item.specialization ? (
                                    <p className="speciality" style={{ fontSize: '0.9rem', color: '#555' }}>
                                        {item.designation}, {item.specialization}
                                    </p>
                                ) : (
                                    <p className="speciality" style={{ fontSize: '0.9rem', color: '#555' }}>
                                        {item.specialization || item.designation || 'General'}
                                    </p>
                                )}
                                <div className="d-flex justify-content-between">
                                    <Link
                                        to={`/doctors/profile/${item.id}`}
                                        className="btn btn-outline-info btn-sm"
                                        style={{ fontSize: '0.8rem', backgroundColor: '#50C878', color: '#fff', borderColor: 'transparent' }}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to={`/booking/${item.id}`}
                                        className="btn btn-success btn-sm"
                                        style={{ fontSize: '0.8rem', backgroundColor: '#fff', borderColor: '#50C878', color: '#50C878' }}
                                    >
                                        Book
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </>
        );
    }

    return (
        <section className="section-doctor container" style={{ marginTop: '20px' }}>
            <div className="row">
                <div className="col-md-3 book">
                    <h2 className="mb-3 section-title text-center" style={{ fontSize: '1.8rem', fontWeight: '700' }}>
                        Book Our Doctor
                    </h2>
                    <p className="text-secondary text-center" style={{ fontSize: '1rem' }}>
                        Quick and easy appointment booking with expert doctors through MediConnect.
                    </p>
                    <div className="text-center">
                        <Link
                            to={'/doctors'}
                            className="btn btn-outline-primary see-more"
                        >
                            See More
                        </Link>
                    </div>
                </div>
                <div className="col-md-9 doctor-row">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={uniqueDoctors.length >= 4 ? 4 : uniqueDoctors.length}
                        navigation={uniqueDoctors.length >= 4} // Enable navigation only when enough slides
                        loop={false} // Disable looping to prevent duplicate slides
                        modules={[Navigation]}
                        style={{
                            padding: '10px',
                            '--swiper-navigation-color': '#007bff',
                            '--swiper-navigation-size': '20px',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 15 },
                            1024: { slidesPerView: 4, spaceBetween: 20 },
                        }}
                    >
                        {content}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default BookDoctor;
