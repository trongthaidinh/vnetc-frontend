import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createPartner } from '~/services/partnerService';
import PushNotification from '~/components/PushNotification';
import styles from './AddPartner.module.scss';
import routes from '~/config/routes';

const AddPartner = () => {
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

        try {
            await createPartner(formData);
            setNotification({ message: 'Thêm đối tác thành công!', type: 'success' });
            resetForm();
            setTimeout(() => {
                navigate(routes.partnerList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm đối tác.', type: 'error' });
            console.error('Lỗi khi tạo đối tác:', error);
        }
    };

    return (
        <div className={styles.addPartner}>
            <h2>Thêm Đối tác</h2>
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
                                    className={styles.partnerLogo}
                                />
                            ))}
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? <div className={styles.spinner}></div> : 'Thêm Đối tác'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddPartner;
