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

    // Mapping reviews to Swiper slides
    if (!isLoading && !isError && data?.length > 0) {
        content = (
            <>
                {data.slice(0, 10)?.map((item, key) => (
                    <SwiperSlide key={item.id + key} className="d-flex justify-content-center">
                        <div className="testimonial-card shadow-sm">
                            {/* Patient Information */}
                            <div className="testimonial-header d-flex align-items-center gap-3">
                                <div className="testimonial-img">
                                    {item.patient.img && (
                                        <img src={item.patient.img} alt="Patient" />
                                    )}
                                </div>
                                <div>
                                    <h5 className="testimonial-name m-0">
                                        {item?.patient?.firstName} {item?.patient?.lastName}
                                    </h5>
                                    <p className="testimonial-desc text-muted m-0">
                                        {truncate(item?.description, 150)}
                                    </p>
                                </div>
                            </div>

                            {/* Recommendation and Rating */}
                            <div className="testimonial-footer mt-3">
                                <p className="recomended text-success d-flex align-items-center gap-1">
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
        <div className="container my-5">
            {/* Section Title */}
            <div className="text-center mb-5">
                <h2 className="fw-bold">Reviews</h2>
                <p className="text-muted">What Our Patients Say</p>
            </div>

            {/* Swiper Carousel */}
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop
            >
                {content}
            </Swiper>
        </div>
    );
};

export default Testimonial;
