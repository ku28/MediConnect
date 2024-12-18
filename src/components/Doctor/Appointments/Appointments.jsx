import React, { useEffect } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import img from '../../../images/avatar.jpg';

import { useGetDoctorAppointmentsQuery, useUpdateAppointmentMutation } from '../../../redux/api/appointmentApi';
import moment from 'moment';
import { Button, Empty, message, Tag, Tooltip, Table, Space } from 'antd';
import { FaEye, FaCheck, FaTimes, FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { clickToCopyClipBoard } from '../../../utils/copyClipBoard';
import './Appointment.css'

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

    const columns = [
        {
            title: 'Patient',
            dataIndex: 'patient',
            key: 'patient',
            render: (_, record) => (
                <Space className="patient-info">
                    <img
                        src={record?.patient?.img || img}
                        alt="Patient"
                        className="patient-avatar"
                    />
                    <div className="patient-name">{record?.patient?.firstName ?? "Private Patient"}</div>
                </Space>
            ),
        },
        {
            title: 'Tracking ID',
            dataIndex: 'trackingId',
            key: 'trackingId',
            render: (trackingId) => (
                <Tooltip title="Copy Tracking ID">
                    <Button
                        onClick={() => clickToCopyClipBoard(trackingId)}
                        className="tracking-id-btn"
                    >
                        <Tag color="#87d068" className="text-uppercase">{trackingId}</Tag>
                    </Button>
                </Tooltip>
            ),
        },
        {
            title: 'Date Scheduled',
            key: 'details',
            width: 350,
            render: (_, record) => (
                <>
                    <p><FaClock className="icon" /> {moment(record?.appointmentTime).format("MMM Do YY")}</p>
                    {record?.patient?.email && <p><FaEnvelope className="icon" /> {record?.patient?.email}</p>}
                </>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            width: 450,
            render: (_, record) => (
                <div className="status-info">
                    <Tag color={record.status === 'pending' ? 'orange' : 'green'}>{record.status}</Tag>
                    <p>Follow-Up: <Tag color={record.isFollowUp ? "#2db7f5" : "#ccc"}>{record.isFollowUp ? "Yes" : "No"}</Tag></p>
                    <p>Paid: <Tag color={record.paymentStatus === 'paid' ? '#87d068' : '#ccc'}>{record.paymentStatus}</Tag></p>
                    <p>Prescribed: <Tag color={record.prescriptionStatus === 'notIssued' ? "#ff4d4f" : "#87d068"}>{record.prescriptionStatus === 'notIssued' ? "Not Issued" : record.prescriptionStatus}</Tag></p>
                    </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 300,
            render: (_, record) => (
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Link to={`/dashboard/appointments/${record.id}`}>
                        <Button type="primary" icon={<FaEye />} size="small">View</Button>
                    </Link>
                    {record.prescriptionStatus === 'notIssued' ? (
                        <Link to={`/dashboard/appointment/treatment/${record.id}`}>
                            <Button type="primary" icon={<FaCheck />} size="small" style={{ backgroundColor: '#52c41a' }}>Treatment</Button>
                        </Link>
                    ) : (
                        <Link to={`/dashboard/prescription/${record.prescription[0]?.id}`}>
                            <Button type="primary" icon={<FaEye />} size="small">Prescription</Button>
                        </Link>
                    )}
                    {record.status === 'pending' && (
                        <Space>
                            <Button type="primary" icon={<FaCheck />} size="small" onClick={() => updatedApppointmentStatus(record.id, 'scheduled')} style={{ backgroundColor: '#87d068' }}>Accept</Button>
                            <Button type="primary" icon={<FaTimes />} size="small" danger onClick={() => updatedApppointmentStatus(record.id, 'cancel')}>Cancel</Button>
                        </Space>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <DashboardLayout>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <div>Something Went Wrong!</div>
            ) : data?.length > 0 ? (
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 10 }}
                    rowKey="id"
                    bordered
                    style={{ background: '#fff', borderRadius: '8px' }}
                    className="appointments-table"
                />
            ) : (
                <Empty />
            )}
        </DashboardLayout>
    );
};

export default Appointments;
