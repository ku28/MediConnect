import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleAppointmentQuery } from '../../../redux/api/appointmentApi';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import moment from 'moment';
import './index.css';
import { Button, Tag, Tooltip } from 'antd';
import { clickToCopyClipBoard } from '../../../utils/copyClipBoard';
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import defaultDoctorImage from "../../../images/img/default-doctor.png";

const ViewAppointment = () => {
    const ref = useRef();
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSingleAppointmentQuery(id);
    const defaultImage = defaultDoctorImage;

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>
    if (isLoading && !isError) content = <h2>Loading...</h2>
    content =
        <>
            <div className="page-container">
                <div className='d-flex justify-content-between rounded p-2' style={{ background: '#f2f4fe' }}>
                    <div>
                        <p className='form-text text-black mb-0'>Creation Date : <Tag bordered={false} color="volcano">{moment(data?.createdAt).format('LL')}</Tag></p>
                        <Tooltip title="Copy Tracking Id">
                            <Button>
                                <h6>Tracking<Tag color="#87d068" className='ms-2 text-uppercase' onClick={() => clickToCopyClipBoard(data?.trackingId)}>{data?.trackingId}</Tag></h6>
                            </Button>
                        </Tooltip>
                    </div>

                    <div style={{ fontWeight: 500 }}>
                        {data?.patientType &&
                        <p className='mb-1'>Patient Type : <Tag bordered={false} color="processing">{data?.patientType}</Tag></p>}
                        <p className='mb-1'>Current Status:  <Tag bordered={false} color="orange">{data?.status}</Tag></p>
                        <p className='mb-1'>Payment : <Tag bordered={false} color="success">{data?.paymentStatus}</Tag></p>
                        <p className='mb-1'>Prescription Status : <Tag bordered={false} color="green">{data?.prescriptionStatus}</Tag></p>
                    </div>
                </div>

                <div className="section-title">APPOINTMENT INFORMATION</div>
                <div className="section-content">
                    <p className='mb-1'>Place of Meeting : <Tag bordered={false} color="#f50">ONLINE</Tag></p>
                    <p className='mb-1'>Meeting Link : <a href="https://meet.google.com/" target='_blank' rel='noreferrer'>https://meet.google.com/</a></p>
                    <p className='mb-1'>Meeting Date : <Tag bordered={false} color="orange">{moment(data?.scheduleDate).format('LL')}</Tag></p>
                    <p className='mb-1'>Meeting Time : <Tag bordered={false} color="orange">{data?.scheduleTime}</Tag></p>
                </div>

                <div className="section-title">DOCTOR INFORMATION</div>
                <div className="section-content">
                    {
                        data?.doctor &&
                        <div className='info-card'>
                            <div>
                                <img src={data?.doctor?.img || defaultImage} alt="" />
                            </div>
                            <div className="info-text">
                                <h5>{data?.doctor?.firstName && data?.doctor?.lastName ? `${data.doctor.firstName} ${data.doctor.lastName}` : (data?.doctor?.firstName || data?.doctor?.lastName)}</h5>
                                <p>{data?.doctor?.specialization}</p>
                                <p>{data?.doctor?.designation}</p>
                                <p>{data?.doctor?.college}</p>
                            </div>
                        </div>
                    }
                </div>

                <div className="section-title">PATIENT INFORMATION</div>
                <div className="section-content">
                    <div className='info-card'>
                        <div>
                            <img src={data?.patient?.img || defaultImage} alt="" />
                        </div>
                        <div className="info-text">
                            <h5>{data?.patient?.firstName + ' ' + data?.patient?.lastName}</h5>
                            <p>Age : {moment().diff(moment(data?.patient?.dateOfBirth), 'years')}</p>
                            <p>Blood Group : {data?.patient?.bloodGroup}</p>
                            <p>{data?.patient?.city + ' , ' + data?.patient?.state + ' , ' + data?.patient?.country}</p>

                            <div className='mt-2'>
                                <p>Reason for Visit - <span className='text-warning'>{data?.reasonForVisit}</span></p>
                                <p className='text-warning'>{data?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    return (
        <>
            <Header />
            <div style={{ margin: '3rem 0' }}>
                <div className="d-flex justify-content-end mb-4">
                    <ReactToPrint
                        bodyClass="print-agreement"
                        content={() => ref.current}
                        trigger={() => (<Button type="primary" icon={<FaPrint />}> Print</Button>)}
                    />
                </div>
                <div ref={ref}>
                    {content}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ViewAppointment;
