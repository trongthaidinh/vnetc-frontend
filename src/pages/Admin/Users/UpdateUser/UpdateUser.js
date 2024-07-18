import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '~/services/userService';
import styles from './UpdateUser.module.scss';
import routes from '~/config/routes';
import LoadingScreen from '~/components/LoadingScreen';

const UpdateUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [initialValues, setInitialValues] = useState(null);

    const validationSchema = Yup.object({
        accountId: Yup.string().required('Account ID is required'),
        username: Yup.string().required('Username is required'),
        fullName: Yup.string().required('Full name is required'),
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
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await updateUser(values);
            setNotification({ message: 'User updated successfully!', type: 'success' });
            resetForm();
            navigate(routes.userList);
        } catch (error) {
            setNotification({ message: 'Error updating user.', type: 'error' });
            console.error('Error updating user:', error);
        }
    };

    if (!initialValues) return <LoadingScreen />;

    return (
        <div className={styles.updateUser}>
            <h2>Update User</h2>
            {notification.message && (
                <div className={notification.type === 'error' ? styles.errorNotification : styles.successNotification}>
                    {notification.message}
                </div>
            )}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className={styles.formGroup}>
                            <label htmlFor="accountId">Account ID</label>
                            <Field name="accountId" type="text" className={styles.input} />
                            <ErrorMessage name="accountId" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className={styles.input} />
                            <ErrorMessage name="username" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="fullName">Full Name</label>
                            <Field name="fullName" type="text" className={styles.input} />
                            <ErrorMessage name="fullName" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Update User
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateUser;
