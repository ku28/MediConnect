import React, { useEffect } from 'react';
import './BookDoctor.css';
import { Link } from 'react-router-dom';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { FaLocationArrow, FaCheckCircle, FaRegHeart, FaClock, FaRupeeSign } from "react-icons/fa";
import { useAddFavouriteMutation } from '../../../redux/api/favouriteApi';
import StarRatings from 'react-star-ratings';
import { message } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import defaultDoctorImage from "../../../images/img/default-doctor.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const BookDoctor = () => {
    const { data, isError, isLoading } = useGetDoctorsQuery({ limit: 10 });
    const doctors = data?.doctors;
    const defaultImage = defaultDoctorImage;

    const [addFavourite, { isSuccess, isLoading: FIsLoading, isError: fIsError, error }] = useAddFavouriteMutation();

    const handleAddFavourite = (id) => {
        addFavourite({ doctorId: id });
    };

    useEffect(() => {
        if (!FIsLoading && fIsError) {
            message.error(error?.data?.message);
        }
        if (isSuccess) {
            message.success('Successfully added to favourites');
        }
    }, [isSuccess, fIsError, FIsLoading, error?.data?.message]);

    let content = null;

    if (!isLoading && isError) {
        content = <div>Something Went Wrong!</div>;
    } else if (!isLoading && !isError && doctors?.length === 0) {
        content = <div>Empty</div>;
    } else {
        content = (
            <>
                {doctors?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="profile-widget shadow-sm">
                            <div className="doc-img position-relative">
                                <Link to={`/doctors/profile/${item?.id}`}>
                                    <img className="img-fluid" alt="Doctor" src={item?.img || defaultImage} />
                                </Link>
                                <a
                                    className="heart-icon position-absolute top-0 end-0 p-2"
                                    onClick={() => handleAddFavourite(item?.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <FaRegHeart />
                                </a>
                            </div>
                            <div className="pro-content">
                                <h3 className="title mb-2">
                                    <Link to={`/doctors/profile/${item?.id}`}>
                                        {item?.firstName + ' ' + item?.lastName + ' '}
                                    </Link>
                                    <FaCheckCircle className='verified' />
                                </h3>
                                {item?.designation && item?.specialization ? (
                                    <p className="speciality">{item?.designation}, {item?.specialization}</p>
                                ) : item?.specialization ? (
                                    <p className="speciality">{item?.specialization}</p>
                                ): item?.designation ? (
                                    <p className="speciality">{item?.designation}</p>
                                ) : (
                                    <p className="speciality"><br /></p>
                                )}
                                <div className="d-flex justify-content-between">
                                    <Link to={`/doctors/profile/${item?.id}`} className="btn btn-outline-info btn-sm">
                                        Profile
                                    </Link>
                                    <Link to={`/booking/${item?.id}`} className="btn btn-success btn-sm">
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
        <section className="section-doctor container">
            <div className="row">
                <div className="col-md-3">
                    <h2 className="mb-3 section-title text-center book">Book Our Doctor</h2>
                    <p className="text-secondary">
                        Quick and easy appointment booking with expert doctors through MediConnect.
                    </p>
                    <div className="text-center">
                        <Link to={'/doctors'} className='btn btn-outline-primary see-more'>See More</Link>
                    </div>
                </div>
                <div className="col-md-9 container">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        loop={true}               // Enables continuous looping
                        modules={[Navigation]}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {content} {/* Render the slides here */}
                    </Swiper>
                </div>            
            </div>
        </section>
    );
};

export default BookDoctor;