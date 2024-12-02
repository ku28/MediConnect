import React from "react";
import "./index.css";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
import ImageHeading from "../../images/doc/doctor 5.jpg";
import whattoSay from "../../images/doc/doc4.jpg";
import SubHeader from "../Shared/SubHeader";
import { Empty } from "antd";
import { useGetDoctorsQuery } from "../../redux/api/doctorApi";

const About = () => {
  const { data: doctorData, isLoading, isError } = useGetDoctorsQuery({
    limit: 4,
  });

  const doctors = doctorData?.doctors;

  let doctorContent = null;

  if (!isLoading && isError) {
    doctorContent = <div>Something Went Wrong!</div>;
  } else if (!isLoading && !isError && doctors?.length === 0) {
    doctorContent = <Empty />;
  } else if (!isLoading && !isError && doctors?.length > 0) {
    doctorContent = (
      <div className="row">
        {doctors.map((item, id) => (
          <div className="col-lg-3 col-md-6 col-sm-6" key={id + item.id}>
            <div className="card">
              {item.img && (
                <img
                  src={item.img}
                  className="img-fluid"
                  alt={item.firstName}
                />
              )}
              <div className="p-2">
                <h4 className="mt-4 mb-0 text-blue-800">
                  {item?.firstName + " " + item?.lastName}
                </h4>
                <p>{item?.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Header />
      <SubHeader
        title="About Us"
        subtitle="Revolutionizing healthcare with seamless online consultations"
      />

      {/* Achievements Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-4">
            <div className="section-title">
              <h2 className="text-uppercase text-blue-800">Our Achievements</h2>
              <p className="text-muted">
                Celebrating milestones in our journey to make healthcare
                accessible for all.
              </p>
            </div>
            <p>
              At MediConnect, we take pride in the milestones that mark our
              journey toward revolutionizing healthcare accessibility. With over
              10,000 successful consultations and a network of 5,000+ certified
              doctors, we have earned the trust of countless users worldwide.
            </p>
          </div>
          <div className="col-lg-8">
            <img
              src={ImageHeading}
              alt="Our Achievements"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>

      {/* Meet Our Specialists Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-title">
              <h2 className="text-uppercase text-blue-800">
                Meet Our Specialists
              </h2>
              <p className="text-muted">
                Connecting you to the best healthcare professionals across the
                globe.
              </p>
            </div>
          </div>
        </div>
        {doctorContent}
      </div>

      {/* What Doctors Say Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="section-title">
              <h2 className="text-uppercase text-blue-800">What Doctors Say</h2>
              <p className="text-muted">
                Our partners share their experiences with MediConnect.
              </p>
            </div>
            <h4 className="text-blue-800">Amazing service!</h4>
            <p className="text-muted">
              MediConnect provides outstanding service by enabling seamless
              healthcare access. The platform's efficiency and responsive
              support make it a leader in the industry, ensuring quality care
              for all patients.
            </p>
            <span className="text-muted">- Dr. John Partho</span>
          </div>
          <div className="col-lg-6">
            <img
              src={whattoSay}
              alt="What Doctors Say"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
