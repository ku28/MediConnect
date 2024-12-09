import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import './Doctors.css';
import DoctorData from './DoctorData';

const Doctors = () => {
    const data = [
		{
          doctorID: "25468456",
		  doctorName: "Dr. Ruby Perrin",
		  speciality: "Dental",
          number: "11",
		  amount: "₹2200.00",
		},
		{
          doctorID: "15749365",
		  doctorName: "Dr. James Smith",
		  speciality: "Cardiology",
          number: "14",
		  amount: "₹4200.00",
		},
		{
            doctorID: "98541203",
			doctorName: "Dr. Khushi",
			speciality: "Gynecologist",
            number: "20",
			amount: "₹10000.00",
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