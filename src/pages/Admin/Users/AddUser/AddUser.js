import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addUser } from '~/services/userService';
import styles from './AddUser.module.scss';

const AddUser = () => {
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        email: '',
        fullName: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Tên đăng nhập là bắt buộc'),
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        fullName: Yup.string().required('Họ và tên là bắt buộc'),
        password: Yup.string().required('Mật khẩu là bắt buộc').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await addUser(values);
            alert('Thêm người dùng thành công!');
            resetForm();
            navigate('/admin/user-list'); // Redirect to user list page
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Lỗi khi thêm người dùng.');
        }
    };

    return (
        <div className={styles.addUser}>
            <h2>Thêm Người dùng</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className={styles.formGroup}>
                            <label htmlFor="username">Tên đăng nhập</label>
                            <Field name="username" type="text" className={styles.input} />
                            <ErrorMessage name="username" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" className={styles.input} />
                            <ErrorMessage name="email" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="fullName">Họ và tên</label>
                            <Field name="fullName" type="text" className={styles.input} />
                            <ErrorMessage name="fullName" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Mật khẩu</label>
                            <Field name="password" type="password" className={styles.input} />
                            <ErrorMessage name="password" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Thêm Người dùng
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddUser;
