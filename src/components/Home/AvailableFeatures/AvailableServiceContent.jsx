import img2 from "../../../images/features/feature-02.jpg";
import img3 from "../../../images/features/feature-01.jpg";
import img4 from "../../../images/features/feature-05.jpg";
import img5 from "../../../images/features/feature-06.jpg";
import img from "../../../images/features/feature.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const AvailableServiceContent = () => {
    const availabeServiceArray = [
        { title: "ICU", img: img },
        { title: "Chamber", img: img5 },
        { title: "Patient Ward", img: img2 },
        { title: "Test Room", img: img3 },
        { title: "Laboratory", img: img4 },
    ];

    return (
        <div
            className="d-flex justify-content-center align-items-center w-100"
            style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 15px",
                boxSizing: "border-box",
            }}
        >
            <Swiper
                spaceBetween={2}
                slidesPerView={4}
                modules={[Navigation, Autoplay]}
                loop={true}
                centeredSlides={false}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                style={{ maxWidth: "100%", margin: "0 auto" }}
            >
                {availabeServiceArray.map((item) => (
                    <SwiperSlide
                        key={item.title}
                        className="text-center d-flex flex-column align-items-center"
                    >
                        <div className="feature-item">
                            <img
                                src={item.img}
                                className="img-fluid"
                                alt={item.title}
                                style={{
                                    borderRadius: "8px",
                                    margin: "0 auto",
                                }}
                            />
                            <p className="mt-2">{item.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AvailableServiceContent;
