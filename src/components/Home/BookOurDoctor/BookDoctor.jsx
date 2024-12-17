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
                                        {item?.firstName + ' ' + item?.lastName}
                                    </Link>
                                    <FaCheckCircle className='verified' />
                                </h3>
                                <p className="speciality">{item?.designation}, {item?.specialization}</p>
                                <div className="d-flex align-items-center gap-1 mb-2">
                                    <StarRatings
                                        rating={5}
                                        starRatedColor="#f4c150"
                                        numberOfStars={5}
                                        starDimension="18px"
                                        starSpacing="2px"
                                    />
                                    <span className="text-secondary">(27)</span>
                                </div>
                                <ul className="available-info list-unstyled mb-3">
                                    <li>
                                        <FaLocationArrow className='icon text-muted me-2' />
                                        Georgia, USA
                                    </li>
                                    <li>
                                        <FaClock className='icon text-muted me-2' />
                                        Available on Fri, 22 Mar
                                    </li>
                                    <li>
                                        <FaRupeeSign className='icon text-muted me-2' />
                                        ₹100 - ₹400
                                    </li>
                                </ul>
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
                    <h2 className="text-center mb-3">Book Our Doctor</h2>
                    <p className="text-secondary">
                        Booking an appointment with our expert doctors is quick and easy through our HMS platform.
                        Browse through a list of qualified doctors, check their availability, and select the time that works best for you.
                    </p>
                    <div className="text-center">
                        <Link to={'/doctors'} className='btn btn-outline-primary'>See More</Link>
                    </div>
                </div>
                <div className="col-md-9 swipe1">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        autoplay={{ delay: 3000 }} // Auto-play is enabled
                        loop={true}               // Enables continuous looping
                        modules={[Navigation, Autoplay]}
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