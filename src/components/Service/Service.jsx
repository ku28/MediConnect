import React from "react";
import SubHeader from "../Shared/SubHeader";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import img from "../../images/features/baby.png";
import { Link } from "react-router-dom";
import doctorBg from "../../images/img/doctors-bg.jpg";
import "./Service.css";
const Service = () => {
  const cardData = [
    {
      img: img,
      title: "Child Care",
      description: "Providing specialized care to support your child's health and development.",
    },
    {
      img: "https://th.bing.com/th/id/OIP.XM2k-5ZtY7sxGbEJsPcVtgHaFj?rs=1&pid=ImgDetMain",
      title: "Cardiology",
      description: "Delivering expert heart care to promote lifelong cardiovascular health.",
    },
    {
      img: "https://skinandcancerinstitute.com/wp-content/uploads/2023/02/Benefits-of-Cosmetic-Dermatology.jpg",
      title: "Dermatology",
      description: "Offering advanced treatments to keep your skin healthy and radiant.",
    },
    {
      img: "https://irp.cdn-website.com/a3a25b4c/dms3rep/multi/Physiotherapist-working-with-children-patient-in-clinic.jpg",
      title: "Orthopedics",
      description: "Expert solutions for bone, joint, and muscle health.",
    },
    {
      img: "https://s4.scoopwhoop.com/anj/food_timings/612678348.jpg",
      title: "Nutrition",
      description: "Personalized nutrition plans for a healthier lifestyle.",
    },
    {
      img: "https://st2.depositphotos.com/3837271/5966/i/950/depositphotos_59669859-stock-photo-mental-health-written-on-board.jpg",
      title: "Mental Health",
      description: "Compassionate support for your emotional and mental well-being.",
    },
  ];

  const weArePleaseStyle = {
    height: "60vh",
    background: `url(${doctorBg}) no-repeat center center/cover`,
    padding: "10px",
    position: "relative",
    marginTop: 200,
    marginBottom: 100,
  };

  return (
    <>
      <Header />
      <SubHeader
        title="Service"
        subtitle="Explore our specialized healthcare services designed for your unique needs."
      />

      <div className="container" style={{ marginTop: 200, marginBottom: 100 }}>
        <div className="row">
          {cardData.map((card, id) => (
            <div className="col-lg-4 col-md-6 col-sm-12 d-flex" key={id}>
              <div className="card shadow border-0 mb-4 w-100 card-hover">
                <img
                  src={card.img}
                  alt={card.title}
                  className="img-fluid"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="p-3 d-flex flex-column justify-content-between">
                  <h4 className="mt-2 mb-2 text-center">{card.title}</h4>
                  <p className="mb-3 text-center">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section style={weArePleaseStyle}>
  {/* Dark overlay */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark overlay
    }}
  ></div>

  {/* Centered content */}
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1, // Ensure content appears above the overlay
    }}
  >
    <div className="text-center text-light">
      <h2
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        We are pleased to offer you the best care
      </h2>
      <p
        style={{
          fontSize: "0.8rem",
          margin: "20px 0",
          lineHeight: "1.6",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        At MediConnect, we prioritize your well-being by connecting you with
        expert healthcare professionals across various specialties. Let us guide
        your journey to better health.
      </p>
      <Link
        to={"/doctors"}
        className="btn get-started"
        style={{
          padding: "10px 30px",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        Get Started
      </Link>
    </div>
  </div>
</section>


      <Footer />
    </>
  );
};

export default Service;
