import React from 'react';

const DoctorData = ({ data }) => {
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
                      <th>Doctor ID</th>
                      <th>Doctor Name</th>
                      <th>Speciality</th>
                      <th>No. of patients viewed</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Iterate over the data array */}
                    {data.map((data, index) => (
                      <tr key={index}>
                        <td>{data.doctorID} </td>
                        <td>
                          <h2 className="table-avatar">
                            <a href="profile.html" className="avatar avatar-sm mr-2">
                            </a>
                            <a href="profile.html">{data.doctorName}</a>
                          </h2>
                        </td>
                        <td>{data.speciality}</td>
                        <td>
                          <h2 className="table-avatar">
                            <a href="profile.html" className="avatar avatar-sm mr-2">
                            </a>
                            <a href="profile.html">{data.number}</a>
                          </h2>
                        </td>
                       
                        <td className="text-right">{data.amount}</td>
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

export default DoctorData;
