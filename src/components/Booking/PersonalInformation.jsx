import { Checkbox, message, Button } from 'antd';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../redux/hooks/useAuthCheck';

const PersonalInformation = ({ handleChange, selectValue, setPatientId = () => {}, onSubmit }) => {
  const { firstName, lastName, email, phone, reasonForVisit, description, address } = selectValue;
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isFormValid, setIsFormValid] = useState(true); // Add this state to manage form validation
  const { data } = useAuthCheck();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\d{10}$/; // Adjust the regex as needed for your requirements
    if (!phoneRegex.test(value)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneError('');
    }
  };

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleFormSubmit = () => {
    // Validate all fields before submitting
    validateEmail(email);
    validatePhone(phone);

    // Check if there are no errors
    if (!emailError && !phoneError) {
      setIsFormValid(true);
      if (onSubmit) {
        onSubmit(); // Proceed to the next step/page (call onSubmit handler passed as prop)
      }
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    if (checked) {
      if (data.id) {
        setPatientId(data.id);
        message.success('User Has Found!');
      } else {
        message.error('User is not Found, Please Login!');
      }
    }
  }, [checked, data, setPatientId]);

  return (
    <>
      <style jsx>{`
        /* Custom styling remains unchanged */
      `}</style>

      <form className="rounded p-3 mt-5 custom-form">
        <div className="row">
          <Checkbox checked={checked} onChange={onChange}>
            Already Have an Account?
          </Checkbox>

          {/* First Name */}
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

          {/* Last Name */}
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

          {/* Email */}
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label mb-3">
              <label>Email</label>
              <input
                onChange={(e) => {
                  handleChange(e);
                  validateEmail(e.target.value);
                }}
                name="email"
                value={email && email}
                className={`form-control custom-input ${emailError ? 'is-invalid' : ''}`}
                type="email"
              />
              {emailError && <small className="text-danger">{emailError}</small>}
            </div>
          </div>

          {/* Phone */}
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label mb-3">
              <label>Phone</label>
              <input
                onChange={(e) => {
                  handleChange(e);
                  validatePhone(e.target.value);
                }}
                name="phone"
                value={phone && phone}
                className={`form-control custom-input ${phoneError ? 'is-invalid' : ''}`}
                type="text"
              />
              {phoneError && <small className="text-danger">{phoneError}</small>}
            </div>
          </div>

          {/* Remaining fields */}
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
