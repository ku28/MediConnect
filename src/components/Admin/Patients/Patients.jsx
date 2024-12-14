import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import './Patients.css';
import PatientData from './PatientData';

const Patients = () => {
	const data = [
		{
			patientName: "Kesar Kumari",
			phone: "1234567890",
			symptomns: "Cold",
			visited: "Dr. James Smith",
			review: "helpful",
		},
		{
			patientName: "Diya",
			phone: "9876541234",
			symptomns: "regular checkup",
			visited: "Dr. Khushi",
			review: "helpful",
		},
		{
			patientName: "Bhumika Aggarwal",
			phone: "7568941023",
			symptomns: "Cough",
			visited: "Dr. John",
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