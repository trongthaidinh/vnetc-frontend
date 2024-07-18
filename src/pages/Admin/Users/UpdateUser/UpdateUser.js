import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '~/services/userService';
import styles from './UpdateUser.module.scss';

const UpdateUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);

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
        password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(id);
                setUser(userData);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await updateUser(id, values);
            alert('Cập nhật người dùng thành công!');
            resetForm();
            navigate('/admin/user-list'); // Redirect to user list page
        } catch (error) {
            console.error('Lỗi khi cập nhật người dùng:', error);
            alert('Lỗi khi cập nhật người dùng.');
        }
    };

    if (!user) {
        return <p>Loading...</p>; // Placeholder for loading state
    }

    return (
        <div className={styles.updateUser}>
            <h2>Cập Nhật Người dùng</h2>
            <Formik
                initialValues={{ ...initialValues, ...user }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
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
                            Cập Nhật Người dùng
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateUser;
