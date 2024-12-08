import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Button, Select, message, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { useUpdateDoctorMutation } from '../../../redux/api/doctorApi';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { doctorSpecialistOptions } from '../../../constant/global';
import ImageUpload from '../../UI/form/ImageUpload';
import dImage from '../../../images/avatar.jpg';

const DoctorProfileSetting = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [updateDoctor, { isLoading, isSuccess, isError, error }] = useUpdateDoctorMutation();
  const { data } = useAuthCheck();
  const { register, handleSubmit } = useForm({});
  const [userId, setUserId] = useState('');
  const [selectValue, setSelectValue] = useState({});
  const [date, setDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (data) {
      const { id, services } = data;
      setUserId(id);
      setSelectedItems(services?.split(','));
    }
  }, [data]);

  const handleChange = (e) => {
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value });
  };

  const onChangeDate = (date, dateString) => {
    setDate(moment(dateString).format());
  };

  const onSubmit = (formData) => {
    const updatedData = { ...formData, ...selectValue };
    if (date) updatedData.dob = date;
    updatedData.services = Array.isArray(selectedItems) ? selectedItems.join(',') : null;

    // Remove empty values
    const cleanedData = Object.fromEntries(Object.entries(updatedData).filter(([_, value]) => value !== ''));

    const formDataObj = new FormData();
    if (selectedImage) formDataObj.append('file', file);
    formDataObj.append('data', JSON.stringify(cleanedData));

    updateDoctor({ data: formDataObj, id: userId });
  };

  useEffect(() => {
    if (isError && !isLoading) {
      message.error(error?.data?.message);
    }
    if (isSuccess) {
      message.success('Successfully Updated!');
    }
  }, [isLoading, isError, error, isSuccess]);

  return (
    <div style={{ marginBottom: '10rem' }}>
      <div className="w-100 mb-3 rounded mb-5 p-2" style={{ background: '#f8f9fa' }}>
        <h5 className="text-title mb-2 mt-3 text-center">Update Your Information</h5>
        <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
          {/* Avatar Section */}
          <div className="col-md-12 mb-5 d-flex justify-content-center align-items-center">
            <div className="form-group">
              <div className="change-avatar d-flex flex-column gap-2 align-items-center">
                <Link to="/" className="my-3 patient-img">
                  <img
                    src={selectedImage ? selectedImage : data?.img || dImage}
                    alt="Avatar"
                    className="rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="mt-3">
                  <ImageUpload setSelectedImage={setSelectedImage} setFile={setFile} />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label>First Name <span className="text-danger">*</span></label>
              <input defaultValue={data?.firstName} {...register("firstName")} className="form-control" />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label>Last Name <span className="text-danger">*</span></label>
              <input defaultValue={data?.lastName} {...register("lastName")} className="form-control" />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label>Email</label>
              <input defaultValue={data?.email} {...register("email")} className="form-control" />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label>Phone Number</label>
              <input defaultValue={data?.phone} {...register("phone")} className="form-control" />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label>Gender</label>
              <select className="form-control select" onChange={handleChange} name="gender">
                <option value="">Select</option>
                <option className="text-capitalize">male</option>
                <option className="text-capitalize">female</option>
                <option className="text-capitalize">other</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label>Date of Birth</label>
              <DatePicker onChange={onChangeDate} format="YYYY-MM-DD" style={{ width: '100%', padding: '6px' }} />
            </div>
          </div>

          {/* Biography */}
          <div className="col-md-12">
            <div className="card mb-2 mt-2">
              <div className="card-body">
                <h6 className="card-title text-secondary">About Me</h6>
                <div className="form-group mb-2 card-label">
                  <label>Biography</label>
                  <textarea defaultValue={data?.biography} {...register("biography")} className="form-control" rows={5} />
                </div>
              </div>
            </div>
          </div>

          {/* Clinic Info */}
          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Clinic Info</h6>
              <div className="row form-row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>Clinic Name</label>
                    <input defaultValue={data?.clinicName} {...register("clinicName")} className="form-control" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>Clinic Address</label>
                    <input defaultValue={data?.clinicAddress} {...register("clinicAddress")} className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Contact Details</h6>
              <div className="row form-row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>Address Line</label>
                    <input defaultValue={data?.address} {...register("address")} className="form-control" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>City</label>
                    <input defaultValue={data?.city} {...register("city")} className="form-control" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>State / Province</label>
                    <input defaultValue={data?.state} {...register("state")} className="form-control" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>Country</label>
                    <input defaultValue={data?.country} {...register("country")} className="form-control" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>Postal Code</label>
                    <input defaultValue={data?.postalCode} {...register("postalCode")} className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Pricing</h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label>Price for 30-minute Consultation</label>
                    <input type="number" {...register("price")} className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="col-md-12">
            <div className="form-group mb-2 card-label">
              <label>Specializations</label>
              <Select
                mode="multiple"
                options={doctorSpecialistOptions}
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="d-flex justify-content-center my-3">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isLoading}
                disabled={isLoading ? true : false}
              >
                {isLoading ? 'Saving ...' : 'Save Changes'}
              </Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfileSetting;
