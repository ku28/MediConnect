import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import Appoint from './Appoint';

import './Appointments.css';

const AdminAppointments = () => {
	const appointments = [
		{
		  doctorName: "Dr. Ruby Perrin",
		  speciality: "Dental",
		  patientName: "Charlene Reed",
		  date: "9 Nov 2024",
		  time: "11:00 AM - 11:15 AM",
		  status : true,
		  amount: "₹200.00",
		},
		{
		  doctorName: "Dr. James Smith",
		  speciality: "Cardiology",
		  patientName: "John Doe",
		  date: "10 Nov 2024",
		  time: "2:00 PM - 2:30 PM",
		  status: false,
		  amount: "₹300.00",
		},
		{
			doctorName: "Dr. Khushi",
			speciality: "Gynecologist",
			patientName: "Riya Singla",
			date: "12 Nov 2024",
			time: "3:15 PM - 3:50 PM",
			status: false,
			amount: "₹500.00",
		  },
	  ];
    return (
        <>
            <AdminLayout >
            <Appoint appointments={appointments} />
            </AdminLayout>
        </>
    )
}
export default AdminAppointments;