import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import Appoint from './Appoint';

import './Appointments.css';

const AdminAppointments = () => {
	const appointments = [
		{
			doctorName: "Dr. Diya Gupta",
			speciality: "Dental",
			patientName: "Charlene Reed",
			date: "9 Nov 2024",
			time: "11:00 AM - 11:15 AM",
			status: true,
			amount: "₹200.00",
		},
		{
			doctorName: "Dr. Kushagra Juneja",
			speciality: "Cardiology",
			patientName: "John Doe",
			date: "10 Nov 2024",
			time: "2:00 PM - 2:30 PM",
			status: true,
			amount: "₹300.00",
		},
		{
			doctorName: "Dr. Khushi Babbar",
			speciality: "Gynecologist",
			patientName: "Riya Singla",
			date: "12 Nov 2024",
			time: "3:15 PM - 3:50 PM",
			status: true,
			amount: "₹500.00",
		},
		{
			doctorName: "Dr. Khushal Goyal",
			speciality: "General",
			patientName: "Rahul Sharma",
			date: "12 Nov 2024",
			time: "3:15 PM - 3:50 PM",
			status: true,
			amount: "₹250.00",
		},
		{
			doctorName: "Dr. Nabh Jindal",
			speciality: "General",
			patientName: "Ajay Kumar",
			date: "13 Nov 2024",
			time: "5:15 PM - 5:40 PM",
			status: true,
			amount: "₹360.00",
		},
		{
			doctorName: "Dr. Kesar Kumari",
			speciality: "Gynecologist",
			patientName: "Deepika",
			date: "14 Nov 2024",
			time: "2:25 PM - 3:50 PM",
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