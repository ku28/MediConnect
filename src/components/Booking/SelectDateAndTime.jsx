import moment from 'moment';
import { DatePicker } from 'antd';

const SelectDateAndTime = ({ content, handleDateChange, disabledDateTime, selectedDate, dContent, selectTime }) => {
    return (
        <div style={{ marginTop: '5rem' }}>
            <div className="doctor-name hover-effect">
                
                <h5 className='text-title'>Selected Doctor</h5>
                {content}
            </div>

            <div className="row justify-content-center">
    <div className="col-md-5 col-sm-12 mt-10 d-flex flex-column align-items-center">
        <h5 className="text-title mb-3">Please Select Date</h5>
        <DatePicker
            format="YYYY-MM-DD"
            disabledDate={disabledDateTime}
            onChange={handleDateChange}
            className="date-picker"
        />
    </div>

                <div className="date-card rounded">
    <div className="row justify-content-center">
        <div className="col-12">
            {
                !selectedDate ? (
                    <h5 className='text-title d-flex justify-content-center align-items-center mt-20'>
                        Please Select A Date First
                    </h5>
                ) : (
                    <div className="row">
                            {dContent}
                        </div>
                )
            }
        </div>
    </div>
</div>

            </div>
        </div>
    );
};


// Inline CSS
const styles = `
.text-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
}

.doctor-name {
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.doctor-name.hover-effect:hover {
    background-color: #e0f7fa;
    transform: scale(1.03);
}

.date-picker {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    transition: border-color 0.3s ease;
}

.date-picker:hover {
    border-color: #0e783c;
}

.date-card {
    background-color: #f9f9f9;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 300px;
    width: 800px;
    margin-top: 20px;
}


.date-card.hover-effect:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

h5.text-title:hover {
    color: #0e783c;
    transition: color 0.3s ease;
}
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default SelectDateAndTime;
