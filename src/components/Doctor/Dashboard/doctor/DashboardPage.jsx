import React, { useEffect, useState } from 'react';
import img from '../../../../images/avatar.jpg';
import { FaEye, FaCheck, FaTimes, FaBriefcaseMedical } from "react-icons/fa";
import { useGetDoctorAppointmentsQuery, useUpdateAppointmentMutation } from '../../../../redux/api/appointmentApi';
import moment from 'moment';
import { Button, Tag, message, Tooltip, Tabs } from 'antd';
import CustomTable from '../../../UI/component/CustomTable';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [sortBy, setSortBy] = useState("upcoming");
    const { data, refetch, isLoading } = useGetDoctorAppointmentsQuery({ sortBy });
    const [updateAppointment, { isError, isSuccess, error }] = useUpdateAppointmentMutation();

    const handleOnselect = (value) => {
        setSortBy(value === 1 ? 'upcoming' : value === 2 ? 'today' : sortBy);
        refetch();
    };

    const updatedAppointmentStatus = (data, type) => {
        const changeObj = { status: type };
        if (data.id) {
            updateAppointment({ id: data.id, data: changeObj });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            message.success("Appointment status updated successfully.");
        }
        if (isError) {
            message.error(error?.data?.message || "Error updating appointment.");
        }
    }, [isSuccess, isError, error]);

    const columns = [
        {
            title: <div style={{ textAlign: 'center' }}>Patient Info</div>,
            key: '1',
            width: 200,
            render: (data) => {
                const fullName = `${data?.patient?.firstName ?? ''} ${data?.patient?.lastName ?? ''}`.trim() || "Unnamed Patient";
                const imgData = data?.patient?.img || img;
                return (
                    <div className="table-avatar d-flex align-items-center gap-2">
                        <img className="avatar-img rounded-circle" src={imgData} alt="" style={{ width: '40px', height: '40px' }} />
                        <div>
                            <p className="m-0 fw-bold">{fullName}</p>
                            {/* <p className="m-0 text-muted text-truncate">{data?.patient?.designation || "No designation"}</p> */}
                        </div>
                    </div>
                );
            }
        },
        {
            title: <div style={{ textAlign: 'center' }}>Appointment Scheduled</div>,
            key: '2',
            width: 150,
            render: (data) => (
                <div className="text-center">
                    <p className="m-0">{moment(data?.scheduleDate).format("LL")}</p>
                    <span className="text-success fw-bold">{data?.scheduleTime}</span>
                </div>
            )
        },
        {
            title: <div style={{ textAlign: 'center' }}>Status</div>,
            key: '3',
            width: 120,
            render: (data) => (
                <Tag style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} color="#50C878" className="fw-bold">{data?.status.toUpperCase()}</Tag>
            )
        },
        {
            title: <div style={{ textAlign: 'center' }}>Actions</div>,
            key: '4',
            width: 250,
            render: (data) => (
                <div className="d-flex justify-content-center gap-2">
                    {data.prescriptionStatus === 'notIssued' ? (
                        <Tooltip title="Start Treatment">
                            <Link to={`/dashboard/appointment/treatment/${data?.id}`}>
                                <Button type="primary" icon={<FaBriefcaseMedical />} size="small">Treat</Button>
                            </Link>
                        </Tooltip>
                    ) : (
                        <Tooltip title="View Prescription">
                            <Link to={`/dashboard/prescription/${data?.prescription[0]?.id}`}>
                                <Button type="primary" shape="circle" icon={<FaEye />} size="small" />
                            </Link>
                        </Tooltip>
                    )}
                    {data?.status === 'pending' && (
                        <>
                            <Tooltip title="Accept Appointment">
                                <Button type="primary" icon={<FaCheck />} size="small" onClick={() => updatedAppointmentStatus(data, 'accept')} />
                            </Tooltip>
                            <Tooltip title="Cancel Appointment">
                                <Button type="primary" icon={<FaTimes />} size="small" danger onClick={() => updatedAppointmentStatus(data, 'cancel')} />
                            </Tooltip>
                        </>
                    )}
                </div>
            )
        }
    ];

    const tabItems = [
        {
            key: '1',
            label: <span className="fw-bold text-primary"></span>,
            children: (
                <CustomTable
                    loading={isLoading}
                    columns={columns}
                    dataSource={data}
                    showPagination={true}
                    pageSize={10}
                    showSizeChanger={true}
                />
            )
        }
    ];

    return (
        <div className="appointments-container p-3">
            <Tabs defaultActiveKey="1" items={tabItems} onChange={handleOnselect} />
        </div>
    );
};

export default DashboardPage;
