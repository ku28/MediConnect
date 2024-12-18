// import React from 'react';
// import img from '../../../images/avatar.jpg';
// import DashboardLayout from '../DashboardLayout/DashboardLayout';
// import { useGetDoctorPatientsQuery } from '../../../redux/api/appointmentApi';
// import moment from 'moment';
// import { Empty } from 'antd';

// const MyPatients = () => {
//     const { data, isLoading, isError } = useGetDoctorPatientsQuery();

//     const getInitPatientName = (item) => {
//         const fullName = `${item?.firstName ?? ''} ${item?.lastName ?? ''}`;
//         return fullName.trim() || "Private Patient";
//     }

//     let content = null;
//     if (!isLoading && isError) content = <div>Something Went Wrong!</div>
//     if (!isLoading && !isError && data?.length === 0) content = <Empty />
//     if (!isLoading && !isError && data?.length > 0) content =
//         <div className="table-responsive">
//             <table className="table table-bordered" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
//                 <thead style={{ backgroundColor: '#28a745', color: '#fff' }}>
//                     <tr>
//                         <th>Serial No</th>
//                         <th>Image</th>
//                         <th>Patient Name</th>
//                         <th>Appointment Date</th>
//                         <th>Email</th>
//                         <th>Phone Number</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item, index) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>
//                                 <img
//                                     src={item?.patient?.img ? item?.patient?.img : img}
//                                     alt="Patient"
//                                     style={{
//                                         width: '50px',
//                                         height: '50px',
//                                         borderRadius: '50%',
//                                         border: '2px solid #28a745',
//                                         objectFit: 'cover',
//                                     }}
//                                 />
//                             </td>
//                             <td>{getInitPatientName(item)}</td>
//                             <td>{moment(item?.appointmentTime).format("MMM Do YY")}</td>
//                             <td>{item?.email}</td>
//                             <td>{item?.mobile}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>

//     return (
//         <DashboardLayout>
//             <div className="row">
//                 <div className="col-md-12">
//                     {content}
//                 </div>
//             </div>
//         </DashboardLayout>
//     )
// }

// export default MyPatients;
