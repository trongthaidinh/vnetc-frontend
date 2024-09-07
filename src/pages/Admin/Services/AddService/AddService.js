import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addService } from '~/services/serviceService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './AddService.module.scss';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';
import Title from '~/components/Title';
import { useDropzone } from 'react-dropzone';

const AddService = () => {
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const initialValues = {
        title: '',
        summary: '',
        images: [],
        categoryId: '',
        content: '',
        isFeatured: false,
        type: '',
        brand: '',
        model: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Tiêu đề là bắt buộc'),
        summary: Yup.string().required('Tóm tắt là bắt buộc'),
        images: Yup.array().required('Hình ảnh là bắt buộc'),
        categoryId: Yup.string().required('Danh mục là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
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
        fetchCategories();
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        },
        accept: 'image/*',
    });

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('name', values.title);
        formData.append('summary', values.summary);
        files.forEach((image) => {
            formData.append('image', image);
        });
        formData.append('categoryId', values.categoryId);
        formData.append('content', values.content);
        formData.append('isFeatured', values.isFeatured);
        formData.append('type', values.type);
        if (values.type === 'isProduct') {
            formData.append('brand', values.brand);
            formData.append('model', values.model);
        }
        formData.append('createdBy', 'admin');

        try {
            await addService(formData);
            setNotification({ message: 'Thêm dịch vụ thành công!', type: 'success' });
            resetForm();
            setFiles([]);
            setTimeout(() => {
                navigate(routes.serviceList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm dịch vụ.', type: 'error' });
            console.error('Lỗi khi tạo dịch vụ:', error);
        }
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.addService}>
            <Title text="Thêm mới dịch vụ" />
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
                            <div {...getRootProps()} className={styles.dropzone}>
                                <input {...getInputProps()} />
                                <p>Kéo thả file vào đây, hoặc nhấn để chọn file</p>
                            </div>
                            <ErrorMessage name="images" component="div" className={styles.error} />
                        </div>
                        <div className={styles.imagesPreview}>
                            {files.map((img, index) => (
                                <div key={index} className={styles.imageContainer}>
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`Service ${index}`}
                                        className={styles.serviceImage}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className={styles.removeButton}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
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
                            Thêm Dịch Vụ
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddService;
