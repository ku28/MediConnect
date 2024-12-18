import React, { useEffect } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import img from '../../../images/avatar.jpg';

import { useGetDoctorAppointmentsQuery, useUpdateAppointmentMutation } from '../../../redux/api/appointmentApi';
import moment from 'moment';
import { Button, Empty, message, Tag, Tooltip, Table, Space } from 'antd';
import { FaEye, FaCheck, FaTimes, FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { clickToCopyClipBoard } from '../../../utils/copyClipBoard';

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
                <Space >
                    <img
                        src={record?.patient?.img || img}
                        alt="Patient"
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                    <div>{record?.patient?.firstName ?? "Private Patient"}</div>
                </Space>
            ),
        },
        {
            title: 'Tracking ID',
            dataIndex: 'trackingId',
            key: 'trackingId',
            render: (trackingId) => (
                <Tooltip title="Copy Tracking ID">
                    <Button onClick={() => clickToCopyClipBoard(trackingId)}>
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
                    {/* {record?.patient?.address && <p><FaLocationArrow className="icon" /> {record?.patient?.address}</p>} */}
                    {record?.patient?.email && <p><FaEnvelope className="icon" /> {record?.patient?.email}</p>}
                    {/* {record?.patient?.phone && <p><FaPhoneAlt className="icon" /> {record?.patient?.phone}</p>} */}
                </>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            width: 450, // Increased width
            render: (_, record) => (
                <div>
                    <Tag color="#f50">{record.status}</Tag>
                    <p>Follow-Up: <Tag color={record.isFollowUp ? "#2db7f5" : "#ccc"}>{record.isFollowUp ? "Yes" : "No"}</Tag></p>
                    <p>Paid: <Tag color="#87d068">{record.paymentStatus}</Tag></p>
                    <p>Prescribed: <Tag color="#2db7f5">{record.prescriptionStatus}</Tag></p>
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 300, // Decreased width
            render: (_, record) => (
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Link to={`/dashboard/appointments/${record.id}`}>
                        <Button type="primary" icon={<FaEye />} size="small">View</Button>
                    </Link>
                    {record.prescriptionStatus === 'notIssued' ? (
                        <Link to={`/dashboard/appointment/treatment/${record.id}`}>
                            <Button type="primary" icon={<FaCheck />} size="small">Treatment</Button>
                        </Link>
                    ) : (
                        <Link to={`/dashboard/prescription/${record.prescription[0]?.id}`}>
                            <Button type="primary" icon={<FaEye />} size="small">Prescription</Button>
                        </Link>
                    )}
                    {record.status === 'pending' && (
                        <Space>
                            <Button type="primary" icon={<FaCheck />} size="small" onClick={() => updatedApppointmentStatus(record.id, 'scheduled')}>Accept</Button>
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
                />
            ) : (
                <Empty />
            )}
        </DashboardLayout>
    );
};

export default Appointments;
