import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './EditNavigation.module.scss';
import Title from '~/components/Title';
import { getNavigationLinks, getNavigationById, updateNavigationLink } from '~/services/navigationService';
import routes from '~/config/routes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PushNotification from '~/components/PushNotification';

const UpdateNavigation = () => {
    const [isError, setIsError] = useState(false);
    const [navigations, setNavigations] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [initialValues, setInitialValues] = useState({
        title: '',
        type: '',
        parentNavId: '',
    });

    const navigate = useNavigate();
    const { id } = useParams(); // Get the navigation ID from the route params

    useEffect(() => {
        const fetchNavigations = async () => {
            const data = await getNavigationLinks();
            setNavigations(data);
        };

        const fetchNavigation = async () => {
            if (id) {
                const data = await getNavigationById(id);
                setInitialValues({
                    title: data.title,
                    type: data.type,
                    parentNavId: data.parentNavId || '',
                });
            }
        };

        fetchNavigations();
        fetchNavigation();
    }, [id]);

    const validationSchema = Yup.object({
        title: Yup.string().required('Vui lòng nhập tiêu đề!'),
        type: Yup.number().required('Vui lòng chọn loại Navigation!').oneOf([1, 2], 'Chọn loại không hợp lệ!'),
        parentNavId: Yup.string(),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const dataToSend = { ...values };
            if (values.type === 2) {
                delete dataToSend.parentNavId;
            }

            await updateNavigationLink(id, dataToSend);
            setTimeout(() => {
                navigate(routes.navigationList);
            }, 1000);
            setIsError(false);
            setNotificationMessage('Cập nhật Navigation thành công');
        } catch (error) {
            setIsError(true);
            setNotificationMessage('Có lỗi khi cập nhật Navigation.');
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
                <Title className={styles.pageTitle} text="Cập nhật Navigation" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
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
                                    {isSubmitting ? 'Đang gửi...' : 'Cập nhật Navigation'}
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

export default UpdateNavigation;
