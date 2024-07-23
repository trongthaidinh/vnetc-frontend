import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createProduct } from '~/services/productService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './AddProduct.module.scss';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        images: [],
        brand: '',
        wattage: '',
        size: '',
        weight: '',
        warranty: '',
        content: '',
        categoryID: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên sản phẩm là bắt buộc'),
        images: Yup.array().required('Hình ảnh là bắt buộc'),
        brand: Yup.string().required('Thương hiệu là bắt buộc'),
        wattage: Yup.string().required('Công suất là bắt buộc'),
        size: Yup.string().required('Kích thước là bắt buộc'),
        weight: Yup.number().required('Trọng lượng là bắt buộc').typeError('Trọng lượng phải là số'),
        warranty: Yup.number().required('Bảo hành là bắt buộc').typeError('Bảo hành phải là số'),
        content: Yup.string().required('Nội dung là bắt buộc'),
        categoryID: Yup.string().required('Danh mục là bắt buộc'),
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategoriesByType(1);
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

        formData.append('name', values.name);
        values.images.forEach((image) => {
            formData.append('images', image);
        });
        formData.append('brand', values.brand);
        formData.append('wattage', values.wattage);
        formData.append('size', values.size);
        formData.append('weight', values.weight);
        formData.append('warranty', values.warranty);
        formData.append('content', values.content);
        formData.append('categoryID', values.categoryID);

        try {
            await createProduct(formData);
            setNotification({ message: 'Thêm sản phẩm thành công!', type: 'success' });
            resetForm();
            setTimeout(() => {
                navigate(routes.productList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm sản phẩm.', type: 'error' });
            console.error('Lỗi khi tạo sản phẩm:', error);
        }
    };

    return (
        <div className={styles.addProduct}>
            <h2>Thêm Sản Phẩm Mới</h2>
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Tên Sản Phẩm</label>
                            <Field name="name" type="text" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
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
                                    alt={`Product ${index}`}
                                    className={styles.productImage}
                                />
                            ))}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="categoryID">Danh Mục</label>
                            <Field as="select" name="categoryID" className={styles.input}>
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoryID" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="brand">Thương Hiệu</label>
                            <Field name="brand" type="text" className={styles.input} />
                            <ErrorMessage name="brand" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="wattage">Công Suất</label>
                            <Field name="wattage" type="text" className={styles.input} />
                            <ErrorMessage name="wattage" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="size">Kích Thước</label>
                            <Field name="size" type="text" className={styles.input} />
                            <ErrorMessage name="size" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="weight">Trọng Lượng</label>
                            <Field name="weight" type="number" className={styles.input} />
                            <ErrorMessage name="weight" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="warranty">Bảo Hành</label>
                            <Field name="warranty" type="number" className={styles.input} />
                            <ErrorMessage name="warranty" component="div" className={styles.error} />
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
                            Thêm Sản Phẩm
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProduct;
