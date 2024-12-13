import React, { useEffect, useState } from 'react';
import { useGetSingleBlogQuery, useUpdateBlogMutation } from '../../../redux/api/blogApi';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, message } from 'antd';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import ImageUpload from '../../UI/form/ImageUpload';
import BlogIcon from '../../../images/blogIcon.png';

const BlogsEdit = () => {
    const { id } = useParams();
    const { data } = useGetSingleBlogQuery(id);
    const [updateBlog, { isLoading, isError, error, isSuccess }] = useUpdateBlogMutation();
    const { register, handleSubmit } = useForm({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const updates = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''));
        const formData = new FormData();
        selectedImage && formData.append('file', file);
        const strData = JSON.stringify(updates);
        formData.append('data', strData);
        updateBlog({ data: formData, id: id });
    };

    useEffect(() => {
        if (!isLoading && isError) {
            message.error(error?.data?.message);
        }
        if (isSuccess) {
            message.success('Successfully Blog Updated!');
            navigate('/dashboard/blogs');
        }
    }, [isLoading, isError, error, isSuccess]);

    return (
        <DashboardLayout>
            <div
                className="p-4"
                style={{
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    maxWidth: '600px',
                    margin: '0 auto',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>
                    Edit Blog
                </h2>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="form-label" style={{ fontWeight: '500' }}>
                            Title
                        </label>
                        <input
                            defaultValue={data?.title}
                            {...register('title')}
                            className="form-control"
                            placeholder="Enter blog title"
                            style={{ borderRadius: '5px' }}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label" style={{ fontWeight: '500' }}>
                            Description
                        </label>
                        <textarea
                            defaultValue={data?.description}
                            {...register('description')}
                            className="form-control"
                            rows={5}
                            placeholder="Enter blog description"
                            style={{ borderRadius: '5px' }}
                        />
                    </div>

                    <div className="mb-4 text-center">
                        <img
                            src={selectedImage ? selectedImage : data?.img || BlogIcon}
                            alt="Blog"
                            style={{ maxWidth: '150px', borderRadius: '10px', marginBottom: '10px' }}
                        />
                        <ImageUpload setSelectedImage={setSelectedImage} setFile={setFile} />
                    </div>

                    <div className="text-center d-flex justify-content-center">
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            loading={isLoading}
                            disabled={isLoading}
                            style={{ borderRadius: '5px', width: '150px' }}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default BlogsEdit;
