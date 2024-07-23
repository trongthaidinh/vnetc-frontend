import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '~/services/userService';
import styles from './UpdateUser.module.scss';
import routes from '~/config/routes';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';

const UpdateUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [initialValues, setInitialValues] = useState(null);

    const validationSchema = Yup.object({
        accountId: Yup.string().required('Account ID is required'),
        username: Yup.string().required('Vui lòng nhập tên đăng nhập!'),
        fullName: Yup.string().required('Vui lòng nhập Họ Tên'),
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserById(id);
                setInitialValues({
                    accountId: user._id,
                    username: user.username,
                    fullName: user.fullName,
                });
            } catch (error) {
                console.error('Error fetching user:', error);
                setNotification({ message: 'Error fetching user data.', type: 'error' });
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await updateUser(values);
            setNotification({ message: 'User updated successfully!', type: 'success' });
            resetForm();
            setTimeout(() => {
                navigate(routes.userList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Error updating user.', type: 'error' });
            console.error('Error updating user:', error);
        }
    };

    if (!initialValues) return <LoadingScreen />;

    return (
        <div className={styles.updateUser}>
            <h2>Chỉnh sửa thông tin người dùng</h2>
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className={styles.formGroup}>
                            <Field readOnly hidden name="accountId" type="text" className={styles.input} />
                            <ErrorMessage name="accountId" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="username">Tên đăng nhập</label>

                            <Field name="username" type="text" className={styles.input} />
                            <ErrorMessage name="username" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="fullName">Họ Tên</label>
                            <Field name="fullName" type="text" className={styles.input} />
                            <ErrorMessage name="fullName" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Cập nhật người dùng
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateUser;
