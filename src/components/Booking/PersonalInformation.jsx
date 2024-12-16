import { Checkbox, message } from 'antd';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../redux/hooks/useAuthCheck';

const PersonalInformation = ({ handleChange, selectValue, setPatientId = () => {} }) => {
  const { firstName, lastName, email, phone, reasonForVisit, description, address } = selectValue;
  const [checked, setChecked] = useState(false);
  const { data } = useAuthCheck();

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    if (checked) {
      if (data.id) {
        setPatientId(data.id);
        message.success("User Has Found!");
      } else {
        message.error("User is not Found, Please Login!");
      }
    }
  }, [checked, data, setPatientId]);

  return (
    <>
      <style jsx>{`
        /* Custom styling */
        .custom-form {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .custom-form:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .custom-input {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease, border 0.3s ease;
          font-size: 1rem;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        .custom-input:focus {
          outline: none;
          border-color: #0e783c;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        .custom-input:hover {
         
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .card-label label {
          font-weight: bold;
          color: #495057;
          transition: color 0.3s ease;
        }

        .custom-input:focus + .card-label label {
          color: #0e783c;
        }

        .checkbox-label {
          font-size: 1.1em;
          color: #0e783c;
          transition: color 0.3s ease;
        }

        .checkbox-label:hover {
          color: #0e783c;
          cursor: pointer;
        }

        .form-group {
          position: relative;
          margin-bottom: 20px;
        }

        .form-group input,
        .form-group textarea {
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #0e783c;
          box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
        }

        .form-group input:not(:focus),
        .form-group textarea:not(:focus) {
          border-color: #ccc;
        }
        
      `}</style>
      
      <form className="rounded p-3 mt-5 custom-form">
        <div className="row">
          <Checkbox checked={checked} onChange={onChange}>
            Already Have an Account ?
          </Checkbox>

          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label mb-3">
              <label>First Name</label>
              <input
                onChange={(e) => handleChange(e)}
                name="firstName"
                value={firstName && firstName}
                className="form-control custom-input"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label mb-3">
              <label>Last Name</label>
              <input
                onChange={(e) => handleChange(e)}
                name="lastName"
                value={lastName && lastName}
                className="form-control custom-input"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label mb-3">
              <label>Email</label>
              <input
                onChange={(e) => handleChange(e)}
                name="email"
                value={email && email}
                className="form-control custom-input"
                type="email"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label mb-3">
              <label>Phone</label>
              <input
                onChange={(e) => handleChange(e)}
                name="phone"
                value={phone && phone}
                className="form-control custom-input"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label mb-3">
              <label>Reason For Visit</label>
              <textarea
                rows={8}
                onChange={(e) => handleChange(e)}
                name="reasonForVisit"
                value={reasonForVisit && reasonForVisit}
                className="form-control custom-input"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label mb-3">
              <label>Description</label>
              <textarea
                rows={8}
                onChange={(e) => handleChange(e)}
                name="description"
                value={description && description}
                className="form-control custom-input"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label mb-3">
              <label>Address</label>
              <input
                onChange={(e) => handleChange(e)}
                name="address"
                value={address && address}
                className="form-control custom-input"
                type="text"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalInformation;
