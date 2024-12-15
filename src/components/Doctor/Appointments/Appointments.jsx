import React, { useEffect } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import img from '../../../images/avatar.jpg';

import './Appointments.css';
import { useGetDoctorAppointmentsQuery, useUpdateAppointmentMutation } from '../../../redux/api/appointmentApi';
import moment from 'moment';
import { Button, Empty, message, Tag, Tooltip } from 'antd';
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { clickToCopyClipBoard } from '../../../utils/copyClipBoard';
import { hasUISelection } from '@testing-library/user-event/dist/cjs/document/UI.js';

const Appointments = () => {
    const { data, isError, isLoading } = useGetDoctorAppointmentsQuery({});
    const [updateAppointment, { isError: updateIsError, isSuccess, error }] = useUpdateAppointmentMutation();

    const updatedApppointmentStatus = (id, type) => {
        const changeObj = { status: type };
        if (id) {
            updateAppointment({ id, data: changeObj });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            message.success("Successfully Updated Appointment");
        }
        if (isError) {
            message.error(error?.data?.message);
        }
    }, [isSuccess, updateIsError, error]);

    const getInitPatientName = (patient) => {
        const fullName = `${patient?.firstName ?? ''} ${patient?.lastName ?? ''}`;
        return fullName.trim() || "Private Patient";
    };

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>;
    if (!isLoading && !isError && data?.length === 0) content = <Empty />;
    if (!isLoading && !isError && data?.length > 0) {
        content = (
            <table className="appointment-table">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Tracking ID</th>
                        <th>Details</th>
                        <th>Appointment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Link to={`/`} className="patient-img">
                                    <img src={item?.patient?.img || img} alt="Patient" />
                                </Link>
                                <div>{getInitPatientName(item.patient)}</div>
                            </td>
                            <td>
                                <Tooltip title="Copy Tracking ID">
                                    <Button onClick={() => clickToCopyClipBoard(item.trackingId)}>
                                        <Tag color="#87d068" className="text-uppercase">{item.trackingId}</Tag>
                                    </Button>
                                </Tooltip>
                            </td>
                            <td>
                                <p><FaClock className="icon" /> {moment(item?.appointmentTime).format("MMM Do YY")}</p>
                                {item?.patient?.address && <p><FaLocationArrow className="icon" /> {item?.patient?.address}</p>}
                                {item?.patient?.email && <p><FaEnvelope className="icon" /> {item?.patient?.email}</p>}
                                {item?.patient?.phone && <p><FaPhoneAlt className="icon" /> {item?.patient?.phone}</p>}
                            </td>
                            <td>
                                <p><Tag color="#f50">{item.status}</Tag></p>
                                <p>Follow-Up: <Tag color={item.isFollowUp ? "#2db7f5" : "#ccc"}>{item.isFollowUp ? "Yes" : "No"}</Tag></p>
                                <p>Paid: <Tag color="#87d068">{item.paymentStatus}</Tag></p>
                                <p>Prescribed: <Tag color="#2db7f5">{item.prescriptionStatus}</Tag></p>
                            </td>
                            <td>
                                <div className="actions">
                                    <Link to={`/dashboard/appointments/${item.id}`}>
                                        <Button type="primary" icon={<FaEye />} size="small">View</Button>
                                    </Link>
                                    {item.prescriptionStatus === 'notIssued' ? (
                                        <Link to={`/dashboard/appointment/treatment/${item.id}`}>
                                            <Button type="primary" icon={<FaCheck />} size="small">Treatment</Button>
                                        </Link>
                                    ) : (
                                        <Link to={`/dashboard/prescription/${item.prescription[0]?.id}`}>
                                            <Button type="primary" icon={<FaEye />} size="small">Prescription</Button>
                                        </Link>
                                    )}
                                    {item.isFollowUp && (
                                        <Link to={`/dashboard/appointment/treatment/edit/${item.prescription[0]?.id}`}>
                                            <Button type="primary" icon={<FaCheck />} size="small">Follow-Up</Button>
                                        </Link>
                                    )}
                                    {item.status === 'pending' && (
                                        <>
                                            <Button type="primary" icon={<FaCheck />} size="small" onClick={() => updatedApppointmentStatus(item.id, 'scheduled')}>Accept</Button>
                                            <Button type="primary" icon={<FaTimes />} size="small" danger onClick={() => updatedApppointmentStatus(item.id, 'cancel')}>Cancel</Button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return (
        <DashboardLayout>
            {content}
        </DashboardLayout>
    );
};

export default Appointments;
