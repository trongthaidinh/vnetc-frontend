import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getServiceById, updateService } from '~/services/serviceService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './UpdateService.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from '~/components/LoadingScreen';
import routes from '~/config/routes';
import Title from '~/components/Title';

const UpdateService = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [initialValues, setInitialValues] = useState(null);
    const [images, setImages] = useState([]);

    const validationSchema = Yup.object({
        title: Yup.string().required('Tên dịch vụ là bắt buộc'),
        summary: Yup.string().required('Tóm tắt là bắt buộc'),
        images: Yup.array().of(Yup.mixed()).required('Hình ảnh là bắt buộc'),
        categoryId: Yup.string().required('Danh mục là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
        isFeatured: Yup.boolean(),
        type: Yup.string().required('Loại dịch vụ là bắt buộc'),
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
                let service = await getServiceById(id);
                service = service.data;
                setInitialValues({
                    title: service.name,
                    summary: service.summary,
                    images: service.image || [],
                    categoryId: service.categoryId,
                    content: service.content,
                    isFeatured: service.isFeatured,
                    type: service.type,
                    brand: service.brand || '',
                    model: service.model || '',
                });
                setImages(service.image || []);
            } catch (error) {
                console.error('Lỗi khi tải dịch vụ:', error);
            }
        };

        fetchCategories();
        fetchService();
    }, [id]);

    const handleImageUpload = (event, setFieldValue) => {
        const files = Array.from(event.target.files);
        setFieldValue('images', [...images, ...files]);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('name', values.title);
        formData.append('summary', values.summary);
        formData.append('categoryId', values.categoryId);
        formData.append('content', values.content);
        formData.append('isFeatured', values.isFeatured);
        formData.append('type', values.type);

        if (values.type === 'isProduct') {
            formData.append('brand', values.brand);
            formData.append('model', values.model);
        }

        if (values.images && values.images.length > 0) {
            values.images.forEach((image) => {
                if (typeof image === 'string') {
                    formData.append('image', image);
                } else {
                    formData.append('image', image);
                }
            });
        } else {
            formData.append('image', initialValues.images);
        }

        try {
            await updateService(id, formData);
            setNotification({ message: 'Cập nhật dịch vụ thành công!', type: 'success' });
            resetForm();
            setTimeout(() => {
                navigate(routes.serviceList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi cập nhật dịch vụ.', type: 'error' });
            console.error('Lỗi khi cập nhật dịch vụ:', error);
        }
    };

    if (!initialValues) {
        return <LoadingScreen />;
    }

    return (
        <div className={styles.updateService}>
            <Title text="Cập nhật dịch vụ" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="type">Loại dịch vụ</label>
                            <Field as="select" name="type" className={styles.input}>
                                <option value="">Chọn loại dịch vụ</option>
                                <option value="isProduct">Sản phẩm</option>
                                <option value="isService">Dịch vụ</option>
                            </Field>
                            <ErrorMessage name="type" component="div" className={styles.error} />
                        </div>

                        {/* Hiển thị thêm input brand và model khi type là isProduct */}
                        {values.type === 'isProduct' && (
                            <>
                                <div className={styles.formGroup}>
                                    <label htmlFor="brand">Hãng sản phẩm</label>
                                    <Field name="brand" type="text" className={styles.input} />
                                    <ErrorMessage name="brand" component="div" className={styles.error} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="model">Kiểu sản phẩm</label>
                                    <Field name="model" type="text" className={styles.input} />
                                    <ErrorMessage name="model" component="div" className={styles.error} />
                                </div>
                            </>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="title">Tên dịch vụ</label>
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
                                accept="image/*"
                                multiple
                                onChange={(event) => handleImageUpload(event, setFieldValue)}
                            />
                            <ErrorMessage name="images" component="div" className={styles.error} />
                        </div>
                        {values.images && (
                            <div className={styles.imagePreview}>
                                {values.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                        alt={`Service ${index}`}
                                        className={styles.serviceImage}
                                    />
                                ))}
                            </div>
                        )}
                        <div className={styles.formGroup}>
                            <label htmlFor="categoryId">Danh Mục</label>
                            <Field as="select" name="categoryId" className={styles.input}>
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <React.Fragment key={category._id}>
                                        <option value={category._id}>{category.name}</option>
                                        {category.subcategories.map((subcategory) => (
                                            <option key={subcategory._id} value={subcategory._id}>
                                                &nbsp;&nbsp;-- {subcategory.name}
                                            </option>
                                        ))}
                                    </React.Fragment>
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
                            Cập Nhật Dịch Vụ
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateService;
