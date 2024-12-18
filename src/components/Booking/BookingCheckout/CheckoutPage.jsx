import moment from 'moment';
import img from '../../../images/avatar.jpg';
import { Link } from 'react-router-dom';

const CheckoutPage = ({ handleChange, selectValue, isCheck, setIsChecked, data, selectedDate, selectTime }) => {
    const { nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, paymentType, paymentMethod } = selectValue;

    const handleCheck = () => {
        setIsChecked(!isCheck);
    };

    let price = data?.price ? data.price : 60;
    let doctorImg = data?.img ? data?.img : img;

    const vat = (15 / 100) * (Number(price));

    return (
        <div className="container mt-5">
             

            <style>
                {`


                    /* Image Hover Effect (Zoom and Brightness) */
                    .booking-doc-img img {
                        transition: transform 0.5s ease, filter 0.3s ease;
                        width: 200px; /* Increased width */
                        height: 200px; /* Increased height */
                        border-radius: 50%; /* Optional: to make the image round */
                    }

                    .booking-doc-img img:hover {
                        transform: scale(1.1);
                        filter: brightness(1.2);
                    }

                    /* Hover effect for the doctor info box */
                    .booking-item-wrap {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }

                    .booking-item-wrap:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    }

                    /* Hover effect for form groups */
                    .form-group:hover {
                        background-color: #e9f7f1; /* Subtle background change */
                        box-shadow: 0 0 8px rgba(80, 200, 120, 0.2); /* Soft shadow */
                        transition: background-color 0.3s ease, box-shadow 0.3s ease;
                    }

                    /* Focus Effect for Inputs */
                    .form-control:focus {
                        border-color: #50C878; /* Green border on focus */
                        box-shadow: 0 0 5px rgba(80, 200, 120, 0.5); /* Green shadow */
                    }

                    /* Smooth Transition on Focus for Inputs */
                    .form-control {
                        transition: all 0.3s ease;
                    }

                    /* Radio Button Label Cursor */
                    .payment-radio label {
                        cursor: pointer;
                    }

                    /* Terms Checkbox Styling */
                    .custom-checkbox label {
                        cursor: pointer;
                    }

                    /* Fade-in Effect for Form Fields */
                    .form-group {
                        opacity: 0;
                        animation: fadeInField 0.5s ease-in-out forwards;
                    }
                    .form-group:nth-child(1) { animation-delay: 0.2s; }
                    .form-group:nth-child(2) { animation-delay: 0.3s; }
                    .form-group:nth-child(3) { animation-delay: 0.4s; }

                    /* Keyframes for Fade-in Animations */
                    @keyframes fadeInField {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}
            </style>
            <div className="row">
                <div className="col-md-7">
                    <div className="rounded p-3 mt-1 custom-form" style={{ background: "#f8f9fa" }}>

                        <div className='row'>
                            <div className="col-md-6 mb-2">
                                <label className="payment-radio credit-card-option">
                                    <input type="radio"
                                        name="paymentType"
                                        value="creditCard"
                                        onChange={(e) => handleChange(e)}
                                        checked={paymentType === 'creditCard'}
                                    />
                                    <span className="ms-2"></span>
                                    <span title="Pay with Credit Card">Credit card</span>
                                </label>
                            </div>
                            <div className="col-md-6 mb-2">
                                <label className="payment-radio credit-card-option">
                                    
                                    <span className="ms-2"></span>
                                    
                                </label>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group card-label mb-3">
                                    <label htmlFor="card_name">Name on Card</label>
                                    <input className="form-control" id="card_name" value={nameOnCard || ''} type="text" onChange={(e) => handleChange(e)} name='nameOnCard' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group card-label mb-3">
                                    <label htmlFor="card_number">Card Number</label>
                                    <input className="form-control" id="card_number" value={cardNumber || ''} placeholder="1234  5678  9876  5432" type="number" onChange={(e) => handleChange(e)} name='cardNumber' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group card-label mb-3">
                                    <label htmlFor="expiry_month">Expiry Month</label>
                                    <input className="form-control" id="expiry_month" value={expiredMonth || ''} placeholder="MM" type="number" onChange={(e) => handleChange(e)} name='expiredMonth' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group card-label mb-3">
                                    <label htmlFor="expiry_year">Expiry Year</label>
                                    <input className="form-control" id="expiry_year" value={cardExpiredYear || ''} placeholder="YY" type="number" onChange={(e) => handleChange(e)} name='cardExpiredYear' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group card-label mb-3">
                                    <label htmlFor="cvv">CVV</label>
                                    <input className="form-control" id="cvv" type="number" value={cvv || ''} onChange={(e) => handleChange(e)} name='cvv' />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex gap-2 mt-3 mb-3">
                            <div>
                                <input type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    onChange={(e) => handleChange(e)}
                                    checked={paymentMethod === 'paypal'}
                                />
                               
                                Paypal
                            </div>
                            <div>
                                <input type="radio"
                                    name="paymentMethod"
                                    value="payoneer"
                                    onChange={(e) => handleChange(e)}
                                    checked={paymentMethod === 'payoneer'}
                                />
                              
                                Payoneer
                            </div>
                        </div>
                        <div className="terms-accept">
                            <div className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="terms_accept" className='me-2'
                                    checked={isCheck}
                                    onChange={handleCheck} />
                                <label htmlFor="terms_accept"> I have read and accept <a className='text-primary' style={{ cursor: 'pointer', textDecoration: 'none' }}>Terms &amp; Conditions</a></label>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-5 col-sm-12">
                    <div className="rounded p-3" style={{ background: "#f8f9fa" }}>
                        {data && <Link to={`/doctors/profile/${data?.id}`} className="booking-doc-img d-flex justify-content-center mb-2 hover-effect">
                            <img src={doctorImg} alt="Doctor" title="View Doctor Profile" />
                        </Link>}
                        {data && <div className='doc-title-info mt-3 mb-3'>
                            <h5 className='mt-3 text-center' style={{
                                fontSize: "22px", fontWeight: 700,
                            }}>Dr. {data?.firstName + ' ' + data?.lastName}</h5>
                            <div className='text-center'>
                                <p className='form-text mb-0'>{data?.designation}</p>
                                <p className='form-text mb-0'>{data?.clinicAddress}</p>
                            </div>
                        </div>}

                        <div className="booking-item-wrap">
                            <ul className="booking-date">
                                <li>Date <span>{moment(selectedDate).format('LL')}</span></li>
                                <li>Time <span>{selectTime}</span></li>
                            </ul>
                            <ul className="booking-fee">
                                <li>Consulting Fee <span>₹{price}</span></li>
                                <li>Booking Fee <span>₹10</span></li>
                                <li>Vat (Including 15%) <span>₹ {vat}</span></li>
                            </ul>

                            <ul className="booking-total">
                                <li className='d-flex justify-content-between'>
                                    <span className='fw-bold'>Total</span>
                                    <span className="total-cost" style={{ color: '#50C878' }}>₹{(Number(price) + 10 + vat)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
