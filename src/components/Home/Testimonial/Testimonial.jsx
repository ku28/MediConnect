import React from 'react';
import './index.css';
import { useGetAllReviewsQuery } from '../../../redux/api/reviewsApi';
import StarRatings from 'react-star-ratings';
import { truncate } from '../../../utils/truncate';
import { FaCheckDouble } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const Testimonial = () => {
    const { data, isLoading, isError } = useGetAllReviewsQuery({});
    let content = null;

    // Handling API states
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>;
    if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>;

    // Determine if sliding should be disabled
    const allowSlide = data?.length > 4;

    // Mapping reviews to Swiper slides
    if (!isLoading && !isError && data?.length > 0) {
        content = (
            <>
                {data.slice(0, 10)?.map((item, key) => (
                    <SwiperSlide key={item.id + key} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            padding: '20px',
                            maxWidth: '300px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#fff'
                        }}>
                            {/* Patient Information */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    overflow: 'hidden'
                                }}>
                                    {item.patient.img && (
                                        <img
                                            src={item.patient.img}
                                            alt="Patient"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <div>
                                    <h5 style={{ margin: 0 }}>{item?.patient?.firstName} {item?.patient?.lastName}</h5>
                                    <p style={{
                                        margin: 0,
                                        color: '#6c757d',
                                        fontSize: '14px'
                                    }}>
                                        {truncate(item?.description, 150)}
                                    </p>
                                </div>
                            </div>

                            {/* Recommendation and Rating */}
                            <div style={{ marginTop: '20px' }}>
                                <p style={{
                                    color: '#28a745',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    fontSize: '14px',
                                    margin: 0
                                }}>
                                    <FaCheckDouble /> Recommended
                                </p>
                                <StarRatings
                                    rating={item.rating || 5}
                                    starRatedColor="#f4c150"
                                    numberOfStars={5}
                                    starDimension="20px"
                                    starSpacing="2px"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </>
        );
    }

    return (
        <div style={{ padding: '50px 20px', backgroundColor: '#f9f9f9' }}>
            {/* Section Title */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontWeight: 'bold' }}>Reviews</h2>
                <p style={{ color: '#6c757d' }}>What Our Patients Say</p>
            </div>

            {/* Swiper Carousel */}
            <Swiper
                spaceBetween={30}
                slidesPerView={4}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                modules={[Navigation, Autoplay]}
                navigation={allowSlide} // Enable navigation only if more than 4 slides
                autoplay={allowSlide ? { delay: 2500, disableOnInteraction: false } : false} // Enable autoplay only if more than 4 slides
                allowSlideNext={allowSlide} // Disable next slide if fewer than 4 slides
                allowSlidePrev={allowSlide} // Disable previous slide if fewer than 4 slides
                loop={false}
                style={{ padding: '20px 0' }}
            >
                {content}
            </Swiper>
        </div>
    );
};

export default Testimonial;
