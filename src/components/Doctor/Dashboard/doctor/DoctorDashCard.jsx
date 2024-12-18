import React, { useState, useEffect } from 'react';
import './index.css';
import { FaHospitalUser, FaCalendarAlt, FaHospital } from "react-icons/fa";

const DoctorDashCard = () => {
    const [totalPatients, setTotalPatients] = useState(0);
    const [totalAppointments, setTotalAppointments] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appointmentsResponse = await fetch('/api/v1/appointment/totalAppointments');
                const appointmentsData = await appointmentsResponse.json();

                const patientsResponse = await fetch('/api/v1/appointment/totalPatients');
                const patientsData = await patientsResponse.json();

                if (appointmentsData.success) {
                    setTotalAppointments(appointmentsData.data.totalAppointments || 0);
                }

                if (patientsData.success) {
                    setTotalPatients(patientsData.data.totalDistinctPatients || 0);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    const cardData = [
        {
            icon: <FaHospital className="icon" />,
            title: 'Total Patients',
            amount: totalPatients,
            bgColor: 'bg-light-green'
        },
        {
            icon: <FaCalendarAlt className="icon" />,
            title: 'Total Appointments',
            amount: totalAppointments,
            bgColor: 'bg-light-green'
        },
        {
            icon: <FaCalendarAlt className="icon" />,
            title: 'Total Earnings',
            amount: totalAppointments,
            bgColor: 'bg-light-green'
        }
    ];

    return (
        <div className="dashboard-container">
            {cardData.map((item, index) => (
                <div className={`dashboard-card ${item.bgColor}`} key={index}>
                    <div className="icon-container">{item.icon}</div>
                    <div className="info-container">
                        <h6 className="card-title">{item.title}</h6>
                        <h4 className="card-amount">{item.amount}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DoctorDashCard;
