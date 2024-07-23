import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNews } from '~/services/newsService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './AddNews.module.scss';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';

const AddNews = () => {
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const initialValues = {
        title: '',
        summary: '',
        images: [],
        categoryId: '',
        content: '',
        isFeatured: false,
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Tiêu đề là bắt buộc'),
        summary: Yup.string().required('Tóm tắt là bắt buộc'),
        images: Yup.array().required('Hình ảnh là bắt buộc'),
        categoryId: Yup.string().required('Danh mục là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategoriesByType(2);
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Lỗi khi tải danh mục:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleImageUpload = (event, setFieldValue) => {
        const files = Array.from(event.target.files);
        setFieldValue('images', files);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('summary', values.summary);
        values.images.forEach((image) => {
            formData.append('images', image);
        });
        formData.append('categoryId', values.categoryId);
        formData.append('content', values.content);
        console.log(values);
        formData.append('isFeatured', values.isFeatured);

        try {
            await createNews(formData);
            setNotification({ message: 'Thêm tin tức thành công!', type: 'success' });
            resetForm();
            setTimeout(() => {
                navigate(routes.newsList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm tin tức.', type: 'error' });
            console.error('Lỗi khi tạo tin tức:', error);
        }
    };

    return (
        <div className={styles.addNews}>
            <h2>Thêm Tin Tức Mới</h2>
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Tiêu Đề</label>
                            <Field name="title" type="text" className={styles.input} />
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="summary">Tóm Tắt</label>
                            <Field name="summary" type="text" className={styles.input} />
                            <ErrorMessage name="summary" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Chọn Hình Ảnh</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(event) => handleImageUpload(event, setFieldValue)}
                            />
                            <ErrorMessage name="images" component="div" className={styles.error} />
                        </div>
                        <div className={styles.imagesPreview}>
                            {values.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(img)}
                                    alt={`News ${index}`}
                                    className={styles.productImage}
                                />
                            ))}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="categoryId">Danh Mục</label>
                            <Field as="select" name="categoryId" className={styles.input}>
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoryId" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content">Nội Dung</label>
                            <CustomEditor
                                onChange={(content) => setFieldValue('content', content)}
                                initialValue={values.content}
                            />
                            <ErrorMessage name="content" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>
                                <Field type="checkbox" name="isFeatured" />
                                Đánh dấu là nổi bật
                            </label>
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Thêm Tin Tức
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddNews;
