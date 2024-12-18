import { Link } from "react-router-dom";
import profileImg from '../../../images/avatar.jpg';
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import moment from "moment";
import { Tag } from "antd";

const TreatmentOverview = ({ data, isAppointment = false }) => {
    return (
        <>
            <div className="w-100 mb-3 rounded p-4 bg-gray-g">
                <div className="container d-flex flex-column flex-lg-row align-items-center">
                    {/* Patient Info Section */}
                    <div className="patient-info w-100 w-lg-4 d-flex flex-column align-items-center text-center mb-4 mb-lg-0 border-left border-success px-4 py-3">
                        <Link to={'/'} className="my-3 patient-img">
                            <img
                                src={data?.patient?.img ? data?.patient?.img : profileImg}
                                alt="Patient"
                                className="rounded-circle"
                                style={{ height: '120px', width: '120px' }}
                            />
                        </Link>
                        <div className="patients-info mt-3">
                            <h5>{data?.patient?.firstName + ' ' + data?.patient?.lastName}</h5>
                            <div className="info">
                                <p><FaClock className='icon' /> {moment(data?.createdAt).format('LL')}</p>
                                <p><FaLocationArrow className='icon' /> {data?.address + ', ' + data?.city}</p>
                                <p><FaEnvelope className='icon' /> {data?.patient?.email}</p>
                                <p><FaPhoneAlt className='icon' /> {data?.patient?.contact ? data?.patient?.contact : '+8801751040425'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div className="overview w-100 w-lg-8 ps-lg-5">
                        <h5>Patient Overview</h5>
                        <hr />
                        <div className="p-3 rounded" style={{ background: 'rgb(218 218 219)' }}>
                            <p className="form-text text-start m-0">{isAppointment ? data?.appointment?.description : data?.description}</p>
                        </div>

                        <div className="text-start mt-3">
                            <h6>Patient Type : 
                                <span className="btn-status btn-st-success">
                                    <Tag color="#87d068" className='ms-2 text-uppercase'>{isAppointment ? data?.appointment?.patientType : data?.patientType}</Tag>
                                </span>
                            </h6>
                            <h6>Current Status : 
                                <span className="btn-status btn-st-danger">
                                    <Tag color="#f50" className='ms-2 text-uppercase'>{isAppointment ? data?.appointment?.status : data?.status}</Tag>
                                </span>
                            </h6>
                            <h6>Payment Status : 
                                <span className="btn-status btn-st-success">
                                    <Tag color="#87d068" className='ms-2 text-uppercase'>{isAppointment ? data?.appointment?.paymentStatus : data?.paymentStatus}</Tag>
                                </span>
                            </h6>
                            <h6>Prescription Status : 
                                <span className="btn-status btn-st-danger">
                                    <Tag color="#2db7f5" className='ms-2 text-uppercase'>{isAppointment ? data?.appointment?.prescriptionStatus : data?.prescriptionStatus}</Tag>
                                </span>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TreatmentOverview;
