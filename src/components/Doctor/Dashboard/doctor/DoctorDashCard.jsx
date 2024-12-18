import React, { useState, useEffect } from 'react';
import './index.css';
import { FaHospitalUser, FaCalendarAlt, FaHospital } from "react-icons/fa";
import axios from "axios";

const DoctorDashCard = () => {
    const [totalPatients, setTotalPatients] = useState(0);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const earnings = '400'

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Working");
                const appointmentsResponse = await axios.get('http://localhost:5050/api/v1/appointment/totalAppointments', {
                    withCredentials: true
                });
                console.log("Data: ", appointmentsResponse.data.data);
                if (appointmentsResponse.data.success) {
                    setTotalAppointments(appointmentsResponse.data.data.totalAppointments || 0);
                }

                const patientsResponse = await axios.get('http://localhost:5050/api/v1/appointment/totalPatients', {
                    withCredentials: true
                });
                console.log("Data: ", patientsResponse.data.data);
                if (patientsResponse.data.success) {
                    setTotalPatients(patientsResponse.data.data.totalDistinctPatients || 0);
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
            bgColor: 'bg-light-green',
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
            amount: earnings,
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
