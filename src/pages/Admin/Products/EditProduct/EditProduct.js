import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateProduct, getProductById } from '~/services/productService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './EditProduct.module.scss';
import routes from '~/config/routes';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [initialValues, setInitialValues] = useState({
        updateName: '',
        updateImage: [],
        brand: '',
        wattage: '',
        size: '',
        weight: '',
        warranty: '',
        content: '',
        updateCate: '',
    });

    const validationSchema = Yup.object({
        updateName: Yup.string().required('Tên sản phẩm là bắt buộc'),
        updateImage: Yup.array().required('Hình ảnh là bắt buộc'),
        brand: Yup.string().required('Thương hiệu là bắt buộc'),
        wattage: Yup.string().required('Công suất là bắt buộc'),
        size: Yup.string().required('Kích thước là bắt buộc'),
        weight: Yup.number().required('Trọng lượng là bắt buộc').typeError('Trọng lượng phải là số'),
        warranty: Yup.number().required('Bảo hành là bắt buộc').typeError('Bảo hành phải là số'),
        content: Yup.string().required('Nội dung là bắt buộc'),
        updateCate: Yup.string().required('Danh mục là bắt buộc'),
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

        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
                setProduct(productData);
                setInitialValues({
                    updateName: productData.name,
                    updateImage: productData.image || [],
                    brand: productData.detail[0].brand,
                    wattage: productData.detail[0].wattage,
                    size: productData.detail[0].size,
                    weight: productData.detail[0].weight,
                    warranty: productData.detail[0].warranty,
                    content: productData.detail[0].content,
                    updateCate: productData.category_id,
                });
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
            }
        };

        fetchCategories();
        fetchProduct();
    }, [id]);

    const handleImageUpload = (event, setFieldValue) => {
        const files = Array.from(event.target.files);
        setFieldValue('updateImage', files);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('updateName', values.updateName);
        values.updateImage.forEach((image) => {
            formData.append('updateImage', image);
        });
        formData.append('brand', values.brand);
        formData.append('wattage', values.wattage);
        formData.append('size', values.size);
        formData.append('weight', values.weight);
        formData.append('warranty', values.warranty);
        formData.append('content', values.content);
        formData.append('updateCate', values.updateCate);

        try {
            await updateProduct(id, formData);
            setNotification({ message: 'Cập nhật sản phẩm thành công!', type: 'success' });
            resetForm();
            navigate(routes.productList);
        } catch (error) {
            setNotification({ message: 'Lỗi khi cập nhật sản phẩm.', type: 'error' });
            console.error('Lỗi khi cập nhật sản phẩm:', error);
        }
    };

    return (
        <div className={styles.editProduct}>
            <h2>Chỉnh Sửa Sản Phẩm</h2>
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            {product && (
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <div className={styles.formGroup}>
                                <label htmlFor="updateName">Tên Sản Phẩm</label>
                                <Field name="updateName" type="text" className={styles.input} />
                                <ErrorMessage name="updateName" component="div" className={styles.error} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Chọn Hình Ảnh</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(event) => handleImageUpload(event, setFieldValue)}
                                />
                                <ErrorMessage name="updateImage" component="div" className={styles.error} />
                            </div>
                            <div className={styles.imagesPreview}>
                                {values.updateImage.map((img, index) => {
                                    const imgSrc = typeof img === 'string' ? img : URL.createObjectURL(img);
                                    return (
                                        <img
                                            key={index}
                                            src={imgSrc}
                                            alt={`Product ${index}`}
                                            className={styles.productImage}
                                        />
                                    );
                                })}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="updateCate">Danh Mục</label>
                                <Field as="select" name="updateCate" className={styles.input}>
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="updateCate" component="div" className={styles.error} />
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
                                Cập Nhật Sản Phẩm
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default EditProduct;
