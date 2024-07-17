import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addService } from '~/services/serviceService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './AddService.module.scss';
import routes from '~/config/routes';

const AddService = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const initialValues = {
        name: '',
        summary: '',
        image: [],
        serviceType: '',
        content: '',
        isFeatured: false,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên dịch vụ là bắt buộc'),
        summary: Yup.string().required('Tóm tắt là bắt buộc'),
        image: Yup.array().required('Hình ảnh là bắt buộc'),
        serviceType: Yup.string().required('Loại dịch vụ là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
        isFeatured: Yup.boolean(),
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategoriesByType(3);
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Lỗi khi tải danh mục:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleImageUpload = (event, setFieldValue) => {
        const files = Array.from(event.target.files);
        setFieldValue('image', files);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('summary', values.summary);
        values.image.forEach((image) => {
            formData.append('image', image);
        });
        formData.append('serviceType', values.serviceType);
        formData.append('content', values.content);
        formData.append('createdBy', 'admin');
        formData.append('isFeatured', values.isFeatured);

        try {
            await addService(formData);
            setNotification({ message: 'Thêm dịch vụ thành công!', type: 'success' });
            resetForm();
            navigate(routes.serviceList);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm dịch vụ.', type: 'error' });
            console.error('Lỗi khi tạo dịch vụ:', error);
        }
    };

    return (
        <div className={styles.addService}>
            <h2>Thêm Dịch vụ</h2>
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Tên Dịch vụ</label>
                            <Field name="name" type="text" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
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
                            <ErrorMessage name="image" component="div" className={styles.error} />
                        </div>
                        <div className={styles.imagePreview}>
                            {values.image.map((img, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(img)}
                                    alt={`Service ${index}`}
                                    className={styles.productImage}
                                />
                            ))}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="serviceType">Loại Dịch vụ</label>
                            <Field as="select" name="serviceType" className={styles.input}>
                                <option value="">Chọn loại dịch vụ</option>
                                {categories.map((category, index) => (
                                    <option key={category._id} value={index}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="serviceType" component="div" className={styles.error} />
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
                                <Field type="checkbox" name="isFeatured" className={styles.checkbox} />
                                Đánh dấu nổi bật
                            </label>
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Thêm Dịch vụ
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddService;
