import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getServiceById, updateService } from '~/services/serviceService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './UpdateService.module.scss';
import routes from '~/config/routes';
import LoadingScreen from '~/components/LoadingScreen';

const UpdateService = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [initialValues, setInitialValues] = useState(null);

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên dịch vụ là bắt buộc'),
        summary: Yup.string().required('Tóm tắt là bắt buộc'),
        image: Yup.string().required('Hình ảnh là bắt buộc'),
        serviceType: Yup.string().required('Loại dịch vụ là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
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

        const fetchService = async () => {
            try {
                const service = await getServiceById(id);
                setInitialValues({
                    name: service.name,
                    summary: service.summary,
                    image: service.image || '',
                    serviceType: service.serviceType,
                    content: service.content,
                });
            } catch (error) {
                console.error('Lỗi khi tải dịch vụ:', error);
            }
        };

        fetchCategories();
        fetchService();
    }, [id]);

    const handleImageUpload = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFieldValue('image', file);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('summary', values.summary);
        formData.append('image', values.image);
        formData.append('serviceType', values.serviceType);
        formData.append('content', values.content);
        formData.append('createdBy', 'admin');

        try {
            await updateService(id, formData);
            setNotification({ message: 'Cập nhật dịch vụ thành công!', type: 'success' });
            resetForm();
            navigate(routes.serviceList);
        } catch (error) {
            setNotification({ message: 'Lỗi khi cập nhật dịch vụ.', type: 'error' });
            console.error('Lỗi khi cập nhật dịch vụ:', error);
        }
    };

    if (!initialValues) return <LoadingScreen />;

    return (
        <div className={styles.updateService}>
            <h2>Cập Nhật Dịch Vụ</h2>
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
                                accept="image/*"
                                onChange={(event) => handleImageUpload(event, setFieldValue)}
                            />
                            <ErrorMessage name="image" component="div" className={styles.error} />
                        </div>
                        {values.image && (
                            <div className={styles.imagePreview}>
                                <img
                                    src={
                                        typeof values.image === 'string'
                                            ? values.image
                                            : values.image instanceof File
                                            ? URL.createObjectURL(values.image)
                                            : ''
                                    }
                                    alt="News"
                                    className={styles.serviceImage}
                                />
                            </div>
                        )}
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
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Cập Nhật Dịch vụ
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateService;
