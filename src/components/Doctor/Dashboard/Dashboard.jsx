import React from 'react'
import DoctorDashCard from './doctor/DoctorDashCard';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import DashboardPage from './doctor/DashboardPage';
import PatientDashboard from './PatientDashboard';

const Dashboard = () => {
    const { role } = useAuthCheck();
    return (
        <>
            <DashboardLayout>
                {role === 'doctor' && <DoctorDashCard />}

                <div className="row">
                    {role === 'patient' &&
                        <div className="col-md-12 rounded" style={{ background: '#f8f9fa' }}>
                            <h5 className="text-title my-3">My Appointments</h5>
                            <PatientDashboard />
                        </div>
                    }
                    {role === 'doctor' &&
                        <div className="col-md-12 rounded mt-3" style={{ background: '#f8f9fa' }}>
                            <h5 className="text-title px-2 mb-0 pt-4" style={{ textAlign: 'center' }}>Appointments</h5>
                            <DashboardPage />
                        </div>
                    }

                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard;