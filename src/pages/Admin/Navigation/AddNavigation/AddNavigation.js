import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddNavigation.module.scss';
import Title from '~/components/Title';
import { getNavigationLinks, createNavigationLink } from '~/services/navigationService';
import routes from '~/config/routes';
import { Link, useNavigate } from 'react-router-dom';
import PushNotification from '~/components/PushNotification';

const AddNavigation = () => {
    const [isError, setIsError] = useState(false);
    const [navigations, setNavigations] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNavigations = async () => {
            const data = await getNavigationLinks();
            setNavigations(data);
        };

        fetchNavigations();
    }, []);

    const initialValues = {
        title: '',
        type: '',
        parentNavId: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Vui lòng nhập tiêu đề!'),
        type: Yup.number().required('Vui lòng chọn loại Navigation!').oneOf([1, 2], 'Chọn loại không hợp lệ!'),
        parentNavId: Yup.string(),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const dataToSend = { ...values };
            if (values.type === 2) {
                delete dataToSend.parentNavId;
            }

            await createNavigationLink(dataToSend);
            resetForm();
            setTimeout(() => {
                navigate(routes.navigationList);
            }, 1000);
            setIsError(false);
            setNotificationMessage('Thêm Navigation thành công');
        } catch (error) {
            setIsError(true);
            setNotificationMessage('Có lỗi khi thêm Navigation.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderNavigationOptions = (navItems, prefix = '') => {
        return navItems.map((nav) => (
            <React.Fragment key={nav._id}>
                <option value={nav._id}>{`${prefix}${nav.title}`}</option>
                {nav.childs && renderNavigationOptions(nav.childs, `${prefix}--`)}
            </React.Fragment>
        ));
    };

    return (
        <div className={styles.navigationContainer}>
            <div className={styles.formContainer}>
                <Title className={styles.pageTitle} text="Thêm mới Navigation" />
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form className={styles.form}>
                            <div className={styles.formItem}>
                                <label htmlFor="title">Tiêu đề</label>
                                <Field name="title" type="text" />
                                <ErrorMessage name="title" component="div" className={styles.errorMessage} />
                            </div>

                            <div className={styles.formItem}>
                                <label htmlFor="type">Loại Navigation</label>
                                <Field
                                    as="select"
                                    name="type"
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        setFieldValue('type', value);
                                        if (value === 1) {
                                            setFieldValue('parentNavId', '');
                                        }
                                    }}
                                >
                                    <option value="">Chọn loại</option>
                                    <option value="2">Navigation chính</option>
                                    <option value="1">Navigation phụ</option>
                                </Field>
                                <ErrorMessage name="type" component="div" className={styles.errorMessage} />
                            </div>

                            {values.type === 1 && (
                                <div className={styles.formItem}>
                                    <label htmlFor="parentNavId">Navigation Cha</label>
                                    <Field as="select" name="parentNavId">
                                        <option value="">Chọn Navigation Cha</option>
                                        {renderNavigationOptions(navigations)}
                                    </Field>
                                    <ErrorMessage name="parentNavId" component="div" className={styles.errorMessage} />
                                </div>
                            )}

                            <div className={styles.buttonContainer}>
                                <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                                    {isSubmitting ? 'Đang gửi...' : 'Thêm Navigation'}
                                </button>
                                <Link to={routes.navigationList} className={styles.backButton}>
                                    <button type="button" className={styles.cancelButton}>
                                        Hủy
                                    </button>
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <PushNotification message={notificationMessage} type={isError ? 'error' : 'success'} />
        </div>
    );
};

export default AddNavigation;
