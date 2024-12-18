import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import './Doctors.css';
import DoctorData from './DoctorData';

const Doctors = () => {
	const data = [
		{
			doctorID: "25468456",
			doctorName: "Dr. Khushal Goyal",
			speciality: "Dental",
			number: "11",
			amount: "₹2200.00",
		},
		{
			doctorID: "15749365",
			doctorName: "Dr. Diya Gupta",
			speciality: "Cardiology",
			number: "14",
			amount: "₹4200.00",
		},
		{
			doctorID: "98541203",
			doctorName: "Dr. Khushi Babbar",
			speciality: "Gynecologist",
			number: "20",
			amount: "₹5000.00",
		},
		{
			doctorID: "85463526",
			doctorName: "Dr. Kushagra Juneja",
			speciality: "Cardiologist",
			number: "25",
			amount: "₹15000.00",
		},
		{
			doctorID: "75681201",
			doctorName: "Dr. Nabh Jindal",
			speciality: "General",
			number: "15",
			amount: "₹8000.00",
		},
		{
			doctorID: "24158674",
			doctorName: "Dr. Kesar Kumari",
			speciality: "Gynecologist",
			number: "11",
			amount: "₹6500.00",
		},
	];
	return (
		<>
			<AdminLayout >
				<DoctorData data={data} />
			</AdminLayout>
		</>
	)
}
export default Doctors;