import DashboardLayout from '../DashboardLayout/DashboardLayout';
import CustomTable from '../../UI/component/CustomTable';
import { Button, Tag, message, Card, Tooltip } from 'antd';
import { FaRegEye, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useDeletePrescriptionMutation, useGetAllPrescriptionsQuery } from '../../../redux/api/prescriptionApi';
import './Prescription.css';

const Prescription = () => {
    const { data, isLoading } = useGetAllPrescriptionsQuery();
    const [deleteBlog] = useDeletePrescriptionMutation();

    const columns = [
        {
            title: 'Appointment Id',
            dataIndex: "appointment",
            key: 1,
            render: ({ trackingId }) => (
            <Tag color="#ff6f6f">{trackingId}</Tag>
            )
        },
        {
            title: 'Disease',
            // sorter: true,
            dataIndex: "disease",
            key: 3,
        },
        {
            title: 'Follow-Update',
            dataIndex: "followUpdate",
            key: 4,
            render: (data) => (
                <Tag color="#87d068">{dayjs(data).format('MMM D, YYYY hh:mm A')}</Tag>
            )
        },
        {
            title: 'Archived',
            dataIndex: "isArchived",
            key: 4,
            render: ({ isArchived }) => (
                <Tag color={isArchived ? "#f50" : "#108ee9"}>{isArchived ? "Yes" : "Under Treatment"}</Tag>
            )
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 5,
            // sorter: true,
            render: (data) => data && dayjs(data).format('MMM D, YYYY hh:mm A')
        },
        {
            title: 'Action',
            key: 4,
            render: (data) => (
                <div className="d-flex justify-content-start">
                    <Tooltip title="View Prescription">
                        <Link to={`/dashboard/prescription/${data.id}`}>
                            <Button type="primary" size="small" className="action-btn" style={{ margin: "5px" }}>
                                <FaRegEye />
                            </Button>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Edit Treatment">
                        <Link to={`/dashboard/appointment/treatment/edit/${data.id}`}>
                            <Button type="primary" size="small" className="action-btn" style={{ margin: "5px" }}>
                                <FaEdit />
                            </Button>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Delete Prescription">
                        <Button onClick={() => deleteHandler(data.id)} size="small" type="primary" style={{ margin: "5px" }} danger>
                            <FaRegTimesCircle />
                        </Button>
                    </Tooltip>
                </div>
            )
        },
    ];

    const deleteHandler = async (id) => {
        message.loading("Deleting ...");
        try {
            const res = await deleteBlog(id);
            if (res) {
                message.success("Successfully Deleted !!");
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <DashboardLayout>
            <Card className="card-container w-100 mb-3">
                <CustomTable
                    loading={isLoading}
                    columns={columns}
                    dataSource={data}
                    pagination={false}  
                />
            </Card>
        </DashboardLayout>
    )
}

export default Prescription;
