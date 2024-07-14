// AddNavigation.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddNavigation.module.scss';
import Title from '~/components/Title';

const AddNavigation = () => {
    const initialValues = {
        title: '',
        type: '',
        parentNavId: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        type: Yup.string().required('Type is required'),
        parentNavId: Yup.string(),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    };

    return (
        <div className={styles.navigationContainer}>
            <Title className={styles.pageTitle} text="Thêm mới Navigation"></Title>
            <div className={styles.formContainer}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form className={styles.form}>
                            <div className={styles.formItem}>
                                <label htmlFor="title">Tiêu đề</label>
                                <Field name="title" type="text" />
                                <ErrorMessage name="title" component="div" className={styles.errorMessage} />
                            </div>

                            <div className={styles.formItem}>
                                <label htmlFor="type">Loại Navigation</label>
                                <Field as="select" name="type">
                                    <option value="">Chọn loại</option>
                                    <option value="1">Navigation chính</option>
                                    <option value="2">Navigation phụ</option>
                                </Field>
                                <ErrorMessage name="type" component="div" className={styles.errorMessage} />
                            </div>

                            <div className={styles.formItem}>
                                <label htmlFor="parentNavId">ID Navigation Cha</label>
                                <Field name="parentNavId" type="text" />
                                <ErrorMessage name="parentNavId" component="div" className={styles.errorMessage} />
                            </div>

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
