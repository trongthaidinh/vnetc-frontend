import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddNavigation.module.scss';
import Title from '~/components/Title';
import { getNavigationLinks, createNavigationLink } from '~/services/navigationService';

const AddNavigation = () => {
    const [navigations, setNavigations] = useState([]);

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
        title: Yup.string().required('Title is required'),
        type: Yup.string().required('Type is required'),
        parentNavId: Yup.string(), // Remove conditional validation for now
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await createNavigationLink(values);
            alert('Navigation added successfully!');
            resetForm();
        } catch (error) {
            console.error('Error adding navigation:', error);
            alert('There was an error adding the navigation.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.navigationContainer}>
            <Title className={styles.pageTitle} text="Thêm mới Navigation" />
            <div className={styles.formContainer}>
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
                                        const value = e.target.value;
                                        setFieldValue('type', value);
                                        if (value === '1') {
                                            // Assuming '1' is for main navigation
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

                            {values.type === '1' && (
                                <div className={styles.formItem}>
                                    <label htmlFor="parentNavId">Navigation Cha</label>
                                    <Field as="select" name="parentNavId">
                                        <option value="">Chọn Navigation Cha</option>
                                        {navigations.map((nav) => (
                                            <option key={nav._id} value={nav._id}>
                                                {nav.title}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="parentNavId" component="div" className={styles.errorMessage} />
                                </div>
                            )}

                            <div className={styles.buttonContainer}>
                                <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                                    {isSubmitting ? 'Đang gửi...' : 'Thêm Navigation'}
                                </button>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={() => {
                                        /* Handle cancel */
                                    }}
                                >
                                    Hủy
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddNavigation;
