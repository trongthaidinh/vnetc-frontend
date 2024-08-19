import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addDepartment } from '~/services/teamService';
import PushNotification from '~/components/PushNotification';
import styles from './AddDepartment.module.scss';
import Title from '~/components/Title';
import routes from '~/config/routes';

const AddDepartment = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: '', type: '' });

    const initialValues = {
        name: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên phòng ban là bắt buộc'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await addDepartment(values);
            resetForm();
            setNotification({ message: 'Thêm phòng ban thành công!', type: 'success' });

            setTimeout(() => {
                navigate(routes.departmentList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm phòng ban.', type: 'error' });
            console.error('Lỗi khi tạo phòng ban:', error);
        }
    };

    return (
        <div className={styles.addDepartment}>
            <Title text="Thêm phòng ban" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Tên Phòng Ban</label>
                            <Field name="name" type="text" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Thêm Phòng Ban
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddDepartment;
