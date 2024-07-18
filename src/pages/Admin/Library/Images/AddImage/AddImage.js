import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createImage } from '~/services/libraryService';
import PushNotification from '~/components/PushNotification';
import styles from './AddImage.module.scss';
import routes from '~/config/routes';

const AddImage = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: '', type: '' });

    const initialValues = {
        image: [],
    };

    const validationSchema = Yup.object({
        image: Yup.array().required('Logo là bắt buộc'),
    });

    const handleLogoUpload = (event, setFieldValue) => {
        const files = Array.from(event.target.files);
        setFieldValue('image', files);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        values.image.forEach((image) => {
            formData.append('image', image);
        });
        // formData.append('createdBy', 'admin');

        try {
            await createImage(formData);
            setNotification({ message: 'Thêm ảnh thành công!', type: 'success' });
            resetForm();
            setTimeout(() => {
                navigate(routes.imagesList);
            }, 3000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm ảnh.', type: 'error' });
            console.error('Lỗi khi tạo ảnh:', error);
        }
    };

    return (
        <div className={styles.addImage}>
            <h2>Thêm ảnh</h2>
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <div className={styles.formGroup}>
                            <label>Chọn Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleLogoUpload(event, setFieldValue)}
                            />
                            <ErrorMessage name="image" component="div" className={styles.error} />
                        </div>
                        <div className={styles.imagePreview}>
                            {values.image.map((img, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(img)}
                                    alt={`Logo ${index}`}
                                    className={styles.imageLogo}
                                />
                            ))}
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Thêm ảnh
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddImage;
