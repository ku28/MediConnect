import React from 'react';

const PatientData = ({ data }) => {
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
                      <th>Patient Name</th>
                      <th>Phone Number</th>
                      <th>Symptomns</th>
                      <th>Doctor visited</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Iterate over the data array */}
                    {data.map((data, index) => (
                      <tr key={index}>
                        <td>{data.patientName} </td>
                        <td>
                          <h2 className="table-avatar">
                            <a href="profile.html" className="avatar avatar-sm mr-2">
                            </a>
                            <a href="profile.html">{data.phone}</a>
                          </h2>
                        </td>
                        <td>{data.symptomns}</td>
                        <td>
                          <h2 className="table-avatar">
                            <a href="profile.html" className="avatar avatar-sm mr-2">
                            </a>
                            <a href="profile.html">{data.visited}</a>
                          </h2>
                        </td>
                        <td className="text-right">{data.review}</td>
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

export default PatientData;
