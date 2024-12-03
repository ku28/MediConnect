import './index.css';
import { appointStatusDsc } from "../../constant/appointmentStatus";

const AppointmentTimeLine = ({ data }) => {

  // changes done
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full">
        <div className="time-line-section">
          <ul className="timeline timeline-horizontal space-y-6">
            {/* Payment Section */}
            <li className="timeline-item mb-5 flex justify-between items-center">
              <div className="timeline-badge bg-white shadow-md p-2">
                <span className="text-indigo-600 text-3xl emoji-hidden sm:inline-block">💰</span>
              </div>
              <div className="timeline-panel bg-white shadow-lg rounded-xl p-4 w-72 ml-6">
                <div>
                  <h6 className="text-xl font-semibold text-indigo-600">
                    Payment - {data?.paymentStatus}
                  </h6>
                  <p className="text-gray-500 mt-2">{appointStatusDsc?.payment}</p>
                </div>
              </div>
            </li>

            {/* Appointment Section */}
            <li className="timeline-item mb-5 flex justify-between items-center">
              <div className="timeline-badge bg-white shadow-md p-2">
                <span className="text-teal-600 text-3xl emoji-hidden sm:inline-block">📅</span>
              </div>
              <div className="timeline-panel bg-white shadow-lg rounded-xl p-4 w-72 ml-6">
                <div>
                  <h6 className="text-xl font-semibold text-teal-600">
                    Appointment - {data?.status}
                  </h6>
                  <p className="text-gray-500 mt-2">
                    {appointStatusDsc.appointment[data?.status]}
                  </p>
                </div>
              </div>
            </li>

            {/* Follow-up Date Section */}
            <li className="timeline-item mb-5 flex justify-between items-center">
              <div className="timeline-badge bg-white shadow-md p-2">
                <span className="text-yellow-600 text-3xl emoji-hidden sm:inline-block">🔄</span>
              </div>
              <div className="timeline-panel bg-white shadow-lg rounded-xl p-4 w-72 ml-6">
                <div>
                  <h6 className="text-xl font-semibold text-yellow-600">
                    Follow-up Date - {data?.followUp ? data?.followUp : 'Not Scheduled Yet'}
                  </h6>
                  <p className="text-gray-500 mt-2">{data?.followUp && appointStatusDsc.followUpDate}</p>
                </div>
              </div>
            </li>

            {/* Prescription Section */}
            <li className="timeline-item mb-5 flex justify-between items-center">
              <div className="timeline-badge bg-white shadow-md p-2">
                <span className="text-green-600 text-3xl emoji-hidden sm:inline-block">💊</span>
              </div>
              <div className="timeline-panel bg-white shadow-lg rounded-xl p-4 w-72 ml-6">
                <div>
                  <h6 className="text-xl font-semibold text-green-600">
                    Prescription - {data?.prescriptionStatus}
                  </h6>
                  <p className="text-gray-500 mt-2">
                    {appointStatusDsc.prescriptionStatus[data?.prescriptionStatus]}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTimeLine;
