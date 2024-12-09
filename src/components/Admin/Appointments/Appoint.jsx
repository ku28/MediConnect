import React from 'react';

const Appoint = ({ appointments }) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="datatable table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Speciality</th>
                      <th>Patient Name</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Iterate over the appointments array */}
                    {appointments.map((appointment, index) => (
                      <tr key={index}>
                        <td>
                          <h2 className="table-avatar">
                            <a href="profile.html" className="avatar avatar-sm mr-2">
                            </a>
                            <a href="profile.html">{appointment.doctorName}</a>
                          </h2>
                        </td>
                        <td>{appointment.speciality}</td>
                        <td>
                          <h2 className="table-avatar">
                            <a href="profile.html" className="avatar avatar-sm mr-2">
                            </a>
                            <a href="profile.html">{appointment.patientName}</a>
                          </h2>
                        </td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>
                          <div className="status-toggle">
                            <input type="checkbox" id={`status_${index}`} className="check" checked={appointment.status} />
                            <label htmlFor={`status_${index}`} className="checktoggle">completed</label>
                          </div>
                        </td>
                        <td className="text-right">{appointment.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appoint;
