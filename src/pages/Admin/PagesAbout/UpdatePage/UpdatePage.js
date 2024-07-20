import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getPageBySlug, updatePageContent } from '~/services/pageService';
import CustomEditor from '~/components/CustomEditor';
import styles from './UpdatePage.module.scss';
import routes from '~/config/routes';

const UpdatePageSchema = Yup.object({
    name: Yup.string().required('Tên không được để trống'),
    content: Yup.string().required('Nội dung không được để trống'),
});

const UpdatePage = () => {
    const location = useLocation();
    const { slug } = location.state || {}; // Retrieve slug from state
    const [initialValues, setInitialValues] = useState({ name: '', content: '' });
    const [currentSlug, setCurrentSlug] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!slug) return; // Ensure slug exists

        const fetchPageContent = async () => {
            try {
                const data = await getPageBySlug(slug);
                if (data) {
                    setInitialValues({ name: data.name, content: data.content });
                    setCurrentSlug(data.slug);
                } else {
                    alert('Không tìm thấy trang.');
                }
            } catch (error) {
                console.error('Error fetching page content:', error);
                alert('Lỗi khi tải dữ liệu trang.');
            }
        };

        fetchPageContent();
    }, [slug]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updatePageContent(currentSlug, values);
            alert('Cập nhật trang thành công!');
            navigate(routes.pageList);
        } catch (error) {
            console.error('Error updating page content:', error);
            alert('Lỗi khi cập nhật trang.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.updatePage}>
            <h2>Cập nhật Trang</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={UpdatePageSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Tên Trang</label>
                            <Field name="name" type="text" placeholder="Nhập tên trang" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content">Nội dung Trang</label>
                            <CustomEditor
                                onChange={(content) => setFieldValue('content', content)}
                                initialValue={values.content}
                            />
                            <ErrorMessage name="content" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formActions}>
                            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                                Cập nhật
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdatePage;
