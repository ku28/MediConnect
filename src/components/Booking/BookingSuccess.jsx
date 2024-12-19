import React, { useEffect } from "react";
import Footer from "../Shared/Footer/Footer";
import {
  FaBriefcase,
  FaCalendarCheck,
  FaRegClock,
  FaLocationArrow,
  FaCalendarAlt,
  FaLink,
  FaAlignLeft,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Tag, Tooltip, Empty } from "antd";
import moment from "moment";
import Header from "../Shared/Header/Header";
import { useGetSingleAppointmentQuery } from "../../redux/api/appointmentApi";
import { clickToCopyClipBoard } from "../../utils/copyClipBoard";

const BookingSuccess = () => {
  const { id } = useParams();
  const { data } = useGetSingleAppointmentQuery(id);
  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!data?.id) {
        navigate("/");
      }
    }, 5000);
    return () => clearTimeout(timeOut);
  }, [navigate, data]);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "100vh",
          background: "#f0f2f5",
        }}
      >
        {data?.id ? (
          <div
            style={{
              padding: "20px",
              marginTop: "8rem",
              marginBottom: "5rem",
              background: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #e8e8e8",
                marginBottom: "20px",
                paddingBottom: "10px",
              }}
            >
              <FaCalendarCheck
                style={{ fontSize: "2.5rem", color: "#52c41a" }}
              />
              <h6 style={{ marginTop: "10px" }}>Meeting is scheduled</h6>
              <p
                style={{
                  color: "#52c41a",
                  background: "#f6ffed",
                  padding: "5px 15px",
                  borderRadius: "20px",
                  display: "inline-block",
                  fontSize: "14px",
                }}
              >
                Check your inbox for an email with all details!
              </p>
            </div>

            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Tooltip title="Copy Tracking Id">
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 20px",
                    gap: "10px",
                  }}
                >
                  <h6 style={{ margin: 0 }}>Tracking</h6>
                  <Tag
                    color="#87d068"
                    className="text-uppercase"
                    onClick={() => clickToCopyClipBoard(data?.trackingId)}
                    style={{ fontSize: "14px", cursor: "pointer" }}
                  >
                    {data?.trackingId}
                  </Tag>
                </Button>
              </Tooltip>
            </div>

            <div
              style={{
                background: "#fafafa",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #e8e8e8",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <FaAlignLeft style={{ fontSize: "1rem" }} />
                <Link
                  to={`/dashboard/appointments/${id}`}
                  style={{ color: "#1890ff" }}
                >
                  <h5 style={{ margin: 0 }}>View Appointment Details</h5>
                </Link>
              </div>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "8px" }}
              >
                <FaBriefcase style={{ fontSize: "1rem" }} />
                <p style={{ margin: 0 }}>With Doctor</p>
              </div>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "8px" }}
              >
                <FaRegClock style={{ fontSize: "1rem" }} />
                <p style={{ margin: 0 }}>30 Min</p>
              </div>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "8px" }}
              >
                <FaLocationArrow style={{ fontSize: "1rem" }} />
                <p style={{ margin: 0 }}>
                  ABC
                  <br />
                  <span style={{ fontSize: "12px", color: "#8c8c8c" }}>
                    DEF
                  </span>
                </p>
              </div>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "8px" }}
              >
                <FaLink style={{ fontSize: "1rem" }} />
                <a
                  href="https://meet.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#1890ff" }}
                >
                  https://meet.google.com/
                </a>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <FaCalendarAlt style={{ fontSize: "1rem" }} />
                <p style={{ margin: 0 }}>
                  {data.scheduleDate &&
                    data.scheduleTime &&
                    moment(data.scheduleDate).format("LL") +
                      " " +
                      data.scheduleTime}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "8rem",
              marginBottom: "5rem",
              textAlign: "center",
            }}
          >
            <Empty />
            <h6 style={{ padding: "10px", marginTop: "20px" }}>
              You will be redirected to the homepage!
            </h6>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};


export default BookingSuccess