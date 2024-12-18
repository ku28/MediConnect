import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Button, DatePicker, Space, message } from "antd";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { DatePickerSinglePresets, DiagnosisOptions, DiseaseOptions, DosageOptions, FrequencyOptions, MedicalCheckupOptions, PatientStatus, appointemntStatusOption } from "../../../constant/global";
import SelectForm from "../../UI/form/SelectForm";
import TextArea from "antd/es/input/TextArea";
import InputAutoCompleteForm from "../../UI/form/InputAutoCompleteForm";
import { useForm } from "react-hook-form";
import SelectFormForMedicine from "../../UI/form/SelectFormForMedicine";
import MedicineRangePickerForm from "../../UI/form/MedicineRangePickerForm";
import { useCreatePrescriptionMutation } from "../../../redux/api/prescriptionApi";
import { useGetSingleAppointmentQuery } from "../../../redux/api/appointmentApi";
import TreatmentOverview from "./TreatmentOverview";

const Treatment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useGetSingleAppointmentQuery(id);
    const { handleSubmit } = useForm();
    const [isDisable, setIsDisable] = useState(true);
    const [selectAppointmentStatus, setSelectAppointmentStatus] = useState('');
    const [patientStatus, setPatientStatus] = useState('');
    const [daignosis, setDaignosis] = useState([]);
    const [disease, setDisease] = useState([]);
    const [medicalCheckup, setMedicalCheckup] = useState([]);
    const [instruction, setInstruction] = useState('');
    const [followUpDate, setFollowUpdate] = useState('');
    const [medicineList, setMedicineList] = useState([{ id: 1 }]);

    useEffect(() => {
        const isInputEmpty = !selectAppointmentStatus || !patientStatus || !instruction || !followUpDate || !daignosis.length || !disease.length || !medicalCheckup.length;
        setIsDisable(isInputEmpty);
    }, [selectAppointmentStatus, patientStatus, followUpDate, instruction, medicineList, daignosis, disease, medicalCheckup]);

    const [createPrescription, { isSuccess, isLoading, isError, error }] = useCreatePrescriptionMutation();

    const addField = (e) => {
        e.preventDefault();
        setMedicineList([...medicineList, { id: medicineList.length + 1 }]);
    };

    const removeFromAddTimeSlot = (id) => {
        setMedicineList(medicineList.filter((item) => item.id !== id));
    };

    const handleFollowUpChange = (date) => {
        if (date) {
            setFollowUpdate(dayjs(date).format());
        }
    };

    const onSubmit = (data) => {
        const obj = {};
        obj.status = selectAppointmentStatus;
        obj.patientType = patientStatus;

        daignosis.length && (obj["daignosis"] = daignosis.join(','));
        disease.length && (obj["disease"] = disease.join(','));
        medicalCheckup.length && (obj["test"] = medicalCheckup.join(','));
        obj.followUpdate = followUpDate;
        obj.instruction = instruction;
        obj.medicine = medicineList;
        obj.appointmentId = id;

        createPrescription({ data: obj });
    };

    useEffect(() => {
        if (!isLoading && isError) {
            message.error(error?.data?.message);
        }
        if (isSuccess) {
            message.success('Successfully Changed Saved!');
            setSelectAppointmentStatus("");
            setPatientStatus("");
            setDaignosis([]);
            setDisease([]);
            setMedicalCheckup([]);
            setInstruction('');
            setFollowUpdate('');
            setMedicineList([{ id: 1 }]);
            navigate('/dashboard/prescription');
        }
    }, [isLoading, isError, error, isSuccess]);

    return (
        <DashboardLayout>
            <TreatmentOverview data={data} />
            <div className="w-100 mb-4 rounded p-5 bg-light shadow-lg">
                <div className="text-center mb-4">
                    <h4 className="text-success border-bottom pb-2">Start Treatment</h4>
                </div>

                <form className="row g-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Change Appointment Status</label>
                            <SelectForm
                                showSearch={true}
                                options={appointemntStatusOption}
                                setSelectData={setSelectAppointmentStatus}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Change Patient Status</label>
                            <SelectForm
                                showSearch={true}
                                options={PatientStatus}
                                setSelectData={setPatientStatus}
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="card p-4 mb-4 shadow-sm">
                            <h6 className="card-title text-secondary">Identify Disease & Symptoms</h6>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label">Diagnosis</label>
                                    <SelectForm
                                        mode={true}
                                        options={DiagnosisOptions}
                                        setSelectData={setDaignosis}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Disease</label>
                                    <SelectForm
                                        mode={true}
                                        options={DiseaseOptions}
                                        setSelectData={setDisease}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="card p-4 mb-4 shadow-sm">
                            <h6 className="card-title text-secondary">Medical Checkup</h6>
                            <SelectForm
                                mode={true}
                                setSelectData={setMedicalCheckup}
                                options={MedicalCheckupOptions}
                            />
                            <small className="form-text text-muted">Note: Type & Press enter to add new services</small>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="card p-4 mb-4 shadow-sm">
                            <h6 className="card-title text-secondary">Medicine</h6>
                            {
                                medicineList?.map((item, index) => (
                                    <div className="border border-success rounded p-4 mb-4" key={index}>
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <label className="form-label">Medicine Name</label>
                                                <InputAutoCompleteForm
                                                    id={item.id}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Dosage</label>
                                                <SelectFormForMedicine
                                                    id={item.id}
                                                    keyName={"dosage"}
                                                    options={DosageOptions}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Frequency</label>
                                                <SelectFormForMedicine
                                                    id={item.id}
                                                    keyName={"frequency"}
                                                    options={FrequencyOptions}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Start Date / End Date</label>
                                                <Space direction="vertical" size={12}>
                                                    <MedicineRangePickerForm
                                                        id={item.id}
                                                        medicineList={medicineList}
                                                        setMedicineList={setMedicineList}
                                                    />
                                                </Space>
                                            </div>
                                        </div>

                                        {/* <button
                                            type="button"
                                            className="btn btn-danger position-absolute"
                                            style={{ top: '-20px', right: '10px' }}
                                            onClick={() => removeFromAddTimeSlot(item.id)}
                                        >
                                            <FaRegTrashAlt />
                                        </button> */}
                                    </div>
                                ))
                            }

                            <Button
                                type="dashed"
                                size="small"
                                block
                                icon={<FaPlus />}
                                onClick={addField}
                            >
                                Add Medicine
                            </Button>
                        </div>
                    </div>

                    <div className="col-12">
                        <label className="form-label">Follow Up Date</label>
                        <DatePicker
                            presets={DatePickerSinglePresets}
                            onChange={handleFollowUpChange}
                            showTime
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Instruction</label>
                        <TextArea
                            rows={4}
                            placeholder="Enter instructions..."
                            onChange={(e) => setInstruction(e.target.value)}
                        />
                    </div>

                    <div className="text-center mt-4 w-1/2">
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            disabled={isDisable}
                            loading={isLoading}
                            className="w-1/2 h-12 text-white" 
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default Treatment;
