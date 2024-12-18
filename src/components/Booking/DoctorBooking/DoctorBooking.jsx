import React, { useEffect, useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import img from "../../../images/img/default-doctor.png";
import './index.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Empty, Button, message, Steps } from 'antd';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import { FaArchway } from "react-icons/fa";
import { useGetAppointmentTimeQuery } from '../../../redux/api/timeSlotApi';
import moment from 'moment';
import SelectDateAndTime from '../SelectDateAndTime';
import PersonalInformation from '../PersonalInformation';
import CheckoutPage from '../BookingCheckout/CheckoutPage';
import { useCreateAppointmentMutation } from '../../../redux/api/appointmentApi';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../../../redux/feature/invoiceSlice';
import Header from '../../Shared/Header/Header';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';

const DoctorBooking = () => {
    // Initial values and hooks
    const dispatch = useDispatch();
    let initialValue = {
        paymentMethod: 'paypal',
        paymentType: 'creditCard',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        reasonForVisit: '',
        description: '',
        address: '',
        nameOnCard: '',
        cardNumber: '',
        expiredMonth: '',
        cardExpiredYear: '',
        cvv: '',
    };
    const { data: loggedInUser, role } = useAuthCheck();
    const [current, setCurrent] = useState(0); // Start at the first step
    const [selectedDate, setSelectedDate] = useState('');
    const [selectDay, setSelecDay] = useState('');
    const [selectTime, setSelectTime] = useState('');
    const [isCheck, setIsChecked] = useState(false);
    const [patientId, setPatientId] = useState('');
    const [createAppointment, { data: appointmentData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createIsLoading }] = useCreateAppointmentMutation();
    const { doctorId } = useParams();
    const navigation = useNavigate();
    const { data, isLoading, isError, error } = useGetDoctorQuery(doctorId);
    const { data: time, refetch, isLoading: dIsLoading, isError: dIsError, error: dError } = useGetAppointmentTimeQuery({ day: selectDay, id: doctorId });

    const [selectValue, setSelectValue] = useState(initialValue);
    const [IsdDisable, setIsDisable] = useState(true);
    const [IsConfirmDisable, setIsConfirmDisable] = useState(true);

    const handleChange = (e) => { setSelectValue({ ...selectValue, [e.target.name]: e.target.value }); }

    useEffect(() => {
        const { firstName, lastName, email, phone, nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, reasonForVisit } = selectValue;
        const isInputEmpty = !firstName || !lastName || !email || !phone || !reasonForVisit;
        const isConfirmInputEmpty = !nameOnCard || !cardNumber || !expiredMonth || !cardExpiredYear || !cvv || !isCheck;
        setIsDisable(isInputEmpty);
        setIsConfirmDisable(isConfirmInputEmpty);
    }, [selectValue, isCheck]);

    const handleDateChange = (_date, dateString) => {
        setSelectedDate(dateString);
        setSelecDay(moment(dateString).format('dddd').toLowerCase());
        refetch();
    };

    const disabledDateTime = (current) => current && (current < moment().add(1, 'day').startOf('day') || current > moment().add(8, 'days').startOf("day"));
    const handleSelectTime = (date) => { setSelectTime(date); }

    const next = () => { setCurrent(current + 1); };
    const prev = () => { setCurrent(current - 1); };

    let dContent = null;
    if (dIsLoading) dContent = <div>Loading ...</div>;
    if (!dIsLoading && dIsError) dContent = <div>Something went wrong!</div>;
    if (!dIsLoading && !dIsError && time.length === 0) dContent = <Empty children="Doctor is not available" />;
    if (!dIsLoading && !dIsError && time.length > 0) dContent =
        <>
            {
                time && time.map((item, id) => (
                    <div className="col-md-4" key={id + 155}>
                        <Button type={item?.slot?.time === selectTime ? "primary" : "default"} shape="round" size='large' className='mb-3' onClick={() => handleSelectTime(item?.slot?.time)}> {item?.slot?.time} </Button>
                    </div>
                ))
            }
        </>;

    // What to render
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>;
    if (!isLoading && !isError && data?.id === undefined) content = <Empty />;
    if (!isLoading && !isError && data?.id) content =
        <>
            <div className="booking-doc-img my-3 mb-3 rounded">
                <Link to={`/doctors/${data?.id}`}>
                    <img src={img} alt="" />
                </Link>
                <div className='text-start'>
                    <Link to={`/doctors/${data?.id}`} style={{ textDecoration: 'none' }}>Dr. {data?.firstName + ' ' + data?.lastName}</Link>
                    <p className="form-text mb-0"><FaArchway /> {data?.specialization + ',' + data?.experienceHospitalName}</p>
                </div>
            </div>
        </>;

const steps = [
    {
        title: (
            <span style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>
                Select Appointment Date & Time
            </span>
        ),
        content: <SelectDateAndTime
            content={content}
            handleDateChange={handleDateChange}
            disabledDateTime={disabledDateTime}
            selectedDate={selectedDate}
            dContent={dContent}
            selectTime={selectTime}
            style={{ fontSize: '16px', fontFamily: 'Arial, sans-serif' }} // Apply font size and style to the content
        />
    },
    {
        title: (
            <span style={{ fontSize: '20px',  fontFamily: 'Arial, sans-serif' }}>
                Patient Information
            </span>
        ),
        content: <PersonalInformation 
            handleChange={handleChange} 
            selectValue={selectValue} 
            setPatientId={setPatientId} 
            style={{ fontSize: '16px', fontFamily: 'Arial, sans-serif' }} // Apply font size and style to the content
        />
    },
    {
        title: (
            <span style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>
                Payment
            </span>
        ),
        content: <CheckoutPage
            handleChange={handleChange}
            selectValue={selectValue}
            isCheck={isCheck}
            setIsChecked={setIsChecked}
            data={data}
            selectedDate={selectedDate}
            selectTime={selectTime}
            style={{ fontSize: '16px', fontFamily: 'Arial, sans-serif' }} // Apply font size and style to the content
        />
    },
];


    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const handleConfirmSchedule = () => {
        const obj = {};
        obj.patientInfo = {
            firstName: selectValue.firstName,
            lastName: selectValue.lastName,
            email: selectValue.email,
            phone: selectValue.phone,
            scheduleDate: selectedDate,
            scheduleTime: selectTime,
            doctorId: doctorId,
            patientId: role !== '' && role === 'patient' ? patientId : undefined,
        };
        obj.payment = {
            paymentType: selectValue.paymentType,
            paymentMethod: selectValue.paymentMethod,
            cardNumber: selectValue.cardNumber,
            cardExpiredYear: selectValue.cardExpiredYear,
            cvv: selectValue.cvv,
            expiredMonth: selectValue.expiredMonth,
            nameOnCard: selectValue.nameOnCard
        };
        createAppointment(obj);
    };

    useEffect(() => {
        if (createIsSuccess) {
            message.success("Successfully Appointment Scheduled");
            setSelectValue(initialValue);
            dispatch(addInvoice({ ...appointmentData }));
            navigation(`/booking/success/${appointmentData.id}`);
        }
        if (createIsError) {
            message.error(error?.data?.message);
        }
    }, [createIsSuccess, createError]);

    return (
        <>
            <Header />
            <div className="container" style={{ 
                marginBottom: '12rem', 
                marginTop: '8rem', 
                padding: '10px',  
                borderRadius: '5px',
                fontSize: '16px', // Increases overall font size for content in the container
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' // Adds a soft shadow
            }}>

                <Steps current={current} items={items} />
                <div className='mb-5 mt-3 mx-3'>{steps[current].content}</div>
                <div className='text-end mx-3'>
                    {current > 0 && (
                        <Button style={{ margin: '0 8px', float: 'left', fontSize: '18px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}

                    {current < steps.length - 1 && (
                        <Button
                            type="primary"
                            disabled={current === 0 ? !selectTime : IsdDisable || !selectTime}
                            onClick={() => next()}
                            style={{ color: 'white', fontSize: '18px' }}
                        >
                            Next
                        </Button>
                    )}

                    {current === steps.length - 1 && (
                        <Button
                            type="primary"
                            disabled={IsConfirmDisable}
                            loading={createIsLoading}
                            onClick={handleConfirmSchedule}
                            style={{ fontSize: '18px' }}
                        >
                            Confirm
                        </Button>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DoctorBooking;
