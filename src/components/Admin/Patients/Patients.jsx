import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import './Patients.css';
import PatientData from './PatientData';

const Patients = () => {
	const data = [
		{
			patientName: "Divyesh Thakur",
			phone: "1234567890",
			symptomns: "Cold",
			visited: "Dr. Nabh Jindal",
			review: "helpful",
		},
		{
			patientName: "Shreya",
			phone: "9876541234",
			symptomns: "regular checkup",
			visited: "Dr. Khushi Babbar",
			review: "helpful",
		},
		{
			patientName: "Bhumika Aggarwal",
			phone: "7568941023",
			symptomns: "Chest Infection",
			visited: "Dr. Diya Gupta",
			review: "helpful",
		},
		{
			patientName: "Shalu Verma",
			phone: "8452001469",
			symptomns: "Typhoid",
			visited: "Dr. Kushal Goyal",
			review: "helpful",
		},
		{
			patientName: "Kashish",
			phone: "7596412325",
			symptomns: "Dengue",
			visited: "Dr. Kesar Kumari",
			review: "helpful",
		},
		{
			patientName: "Akansha",
			phone: "8456925547",
			symptomns: "Cough",
			visited: "Dr. Kushal Goyal",
			review: "helpful",
		},
	];
	return (
		<>
			<AdminLayout >
				<PatientData data={data} />
			</AdminLayout>
		</>
	)
}
export default Patients;