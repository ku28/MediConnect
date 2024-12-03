import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import "./index.css";
import { Input, message } from "antd";
import { useTrackAppointmentMutation } from "../../redux/api/appointmentApi";
import TrackDetailPage from "./TrackDetailPage";
import { useEffect, useState } from "react";
import AvailableServiceContent from "../Home/AvailableFeatures/AvailableServiceContent";

const { Search } = Input;

const TrackAppointment = () => {
  const [trackAppointment, { data, isSuccess, isLoading, isError, error }] =
    useTrackAppointmentMutation();
  const [showInfo, setShowInfo] = useState(false);

  const onSearch = (value) => {
    if (value.length > 5) {
      trackAppointment({ id: value });
    } else {
      message.warning("Please enter a valid ID with more than 5 characters.");
    }
  };

  useEffect(() => {
    if (isSuccess && !isError && data?.id) {
      message.success("Successfully retrieved appointment information!");
      setShowInfo(!showInfo);
    }
    if (isError) {
      message.error(
        error?.data?.message || "An error occurred while fetching the data."
      );
    }
    if (isSuccess && data?.id === undefined) {
      message.error("No appointment details found.");
    }
  }, [isSuccess, isError, error, data]);

  // What to render
  let content = null;
  if (!isLoading && isError)
    content = (
      <div className="text-center text-danger">Something went wrong!</div>
    );
  if (!isLoading && !isError && data?.id)
    content = <TrackDetailPage data={data} setShowInfo={setShowInfo} />;

  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh" }}>
        {showInfo ? (
          content
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "10rem", width: "100%", overflowX: "hidden" }}
          >
            <div style={{ width: "100%", overflowX: "hidden" }}>
              <div className="mb-5 section-title text-center">
                <h2>Track Your Appointment</h2>
                <p className="m-0">
                  Enter your appointment ID below to check the status and view
                  more details.
                </p>
              </div>
              <div className="mx-auto d-flex justify-content-center">
                <Search
                  placeholder="Enter your appointment ID..."
                  allowClear
                  enterButton="Track"
                  onSearch={onSearch}
                  style={{ width: "100%", maxWidth: "400px" }}
                  size="large"
                />
              </div>

              <section
                className="container d-flex flex-column justify-content-center align-items-center"
                style={{
                  marginBottom: "8rem",
                  marginTop: "5rem",
                  textAlign: "center",
                  width: "100%",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
              >
                <div style={{ maxWidth: "900px", width: "100%" }}>
                  <div className="mb-4 section-title text-center">
                    <h5 className="text-uppercase">Available Services</h5>
                    <p>
                      Explore the range of services we offer to ensure your
                      health and convenience.
                    </p>
                  </div>
                  <AvailableServiceContent />
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TrackAppointment;
