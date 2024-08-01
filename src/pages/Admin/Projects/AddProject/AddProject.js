import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addProject } from '~/services/projectService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './AddProject.module.scss';
import routes from '~/config/routes';
import Title from '~/components/Title';
import { useDropzone } from 'react-dropzone';

const AddProject = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [files, setFiles] = useState([]);

    const initialValues = {
        name: '',
        summary: '',
        projectType: '',
        content: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên dự án là bắt buộc'),
        summary: Yup.string().required('Tóm tắt là bắt buộc'),
        projectType: Yup.string().required('Loại dự án là bắt buộc'),
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

        formData.append('name', values.name);
        formData.append('summary', values.summary);
        files.forEach((image) => {
            formData.append('image', image);
        });
        formData.append('projectType', values.projectType);
        formData.append('content', values.content);
        formData.append('createdBy', 'admin');

        try {
            await addProject(formData);
            setNotification({ message: 'Thêm dự án thành công!', type: 'success' });
            resetForm();
            setFiles([]);
            setTimeout(() => {
                navigate(routes.projectList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm dự án.', type: 'error' });
            console.error('Lỗi khi tạo dự án:', error);
        }
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.addProject}>
            <Title text="Thêm mới dự án" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Tên Dự án</label>
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
                            <div {...getRootProps()} className={styles.dropzone}>
                                <input {...getInputProps()} />
                                <p>Kéo thả file vào đây, hoặc nhấn để chọn file</p>
                            </div>
                            <ErrorMessage name="image" component="div" className={styles.error} />
                        </div>
                        <div className={styles.imagePreview}>
                            {files.map((img, index) => (
                                <div key={index} className={styles.imageContainer}>
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`Project ${index}`}
                                        className={styles.projectImage}
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
                            <label htmlFor="projectType">Loại Dự án</label>
                            <Field as="select" name="projectType" className={styles.input}>
                                <option value="">Chọn loại dự án</option>
                                {categories.map((category, index) => (
                                    <option key={category._id} value={index}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="projectType" component="div" className={styles.error} />
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
                            Thêm Dự án
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProject;
