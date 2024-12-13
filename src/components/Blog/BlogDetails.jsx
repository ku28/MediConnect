import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleBlogQuery } from "../../redux/api/blogApi";
import { Empty, message } from "antd";
import Header from "../Shared/Header/Header";
import SubHeader from "../Shared/SubHeader";
import { FaRegUser, FaBusinessTime } from "react-icons/fa";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import moment from "moment";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleBlogQuery(id);

  let content = null;
  if (!isLoading && isError)
    content = <div>{message.error("Something went Wrong!")}</div>;
  if (!isLoading && !isError && data?.id === undefined) content = <Empty />;
  if (!isLoading && !isError && data?.id)
    content = (
      <div className="blog-details-card shadow-lg rounded-lg overflow-hidden">
        <div
          className="flex-column card-header p-0 border-0 d-flex justify-content-center align-items-center"
          style={{ overflow: "hidden" }}
        >
          {data?.img && (
            <img
              src={data?.img}
              alt="blog Image"
              className="image-hover w-100"
              style={{ objectFit: "cover", height: "400px" }}
            />
          )}
        </div>

        <div className="card-body p-4">
          <h5 className="text-start mb-3  text-green">
            {data?.title}
          </h5>
          <div className="d-flex text-start gap-4 mb-3">
            <div className="d-flex gap-2 text-muted align-items-center">
              <FaRegUser className="form-text" />
              <span className="form-text">
                {data?.user?.firstName + " " + data?.user?.lastName}
              </span>
            </div>
            <div className="d-flex gap-2 text-muted align-items-center">
              <FaBusinessTime className="form-text" />
              <span className="form-text">
                {moment(data?.createdAt).format("LL")}
              </span>
            </div>
          </div>

          <div className="my-3 text-secondary text-start">
            <p>{data?.description}</p>
          </div>

          <div className="d-flex align-items-center justify-content-end mt-5">
            <h5 className="text-dark me-2 mb-0">Share On</h5>
            <div className="social-icons">
              <a
                className="btn btn-floating m-1"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare />
              </a>
              <a
                className="btn btn-floating m-1"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare />
              </a>
              <a
                className="btn btn-floating m-1"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <Header />
      <SubHeader
        title="Blog Details"
        subtitle="Explore the latest insights and articles."
      />
      <div className="container" style={{ marginTop: 100 }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-sm-12">{content}</div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
