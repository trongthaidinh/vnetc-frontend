import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addPageContent } from '~/services/pageService';
import CustomEditor from '~/components/CustomEditor';
import styles from './AddPage.module.scss';

// Validation schema
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
});

const AddPage = () => {
    const initialValues = {
        title: '',
        content: '',
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const { title, content } = values;
            await addPageContent({ name: title, content });
            resetForm();
            alert('Page added successfully!');
        } catch (error) {
            alert('Error adding page!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.addPage}>
            <h2>Thêm mới Trang</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Title</label>
                            <Field name="title" type="text" className={styles.input} />
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content">Content</label>
                            <CustomEditor
                                onChange={(content) => setFieldValue('content', content)}
                                initialValue={values.content}
                            />
                            <ErrorMessage name="content" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                                Thêm Trang
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddPage;
