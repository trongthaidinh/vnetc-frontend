import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addLegal } from '~/services/legalService';
import { getCategoriesByType } from '~/services/categoryService';
import PushNotification from '~/components/PushNotification';
import styles from './AddLegal.module.scss';
import routes from '~/config/routes';
import Title from '~/components/Title';
import { useDropzone } from 'react-dropzone';

const AddLegal = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [files, setFiles] = useState([]);

    const initialValues = {
        title: '',
        content: '',
        type: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Tên văn bản pháp quy là bắt buộc'),
        content: Yup.string().required('Tóm tắt là bắt buộc'),
        type: Yup.string().required('Loại văn bản pháp quy là bắt buộc'),
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

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        },
        accept: 'application/pdf',
    });

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('content', values.content);
        files.forEach((file) => {
            formData.append('file', file);
        });
        formData.append('type', values.type);

        try {
            await addLegal(formData);
            setNotification({ message: 'Thêm văn bản pháp quy thành công!', type: 'success' });
            resetForm();
            setFiles([]);
            setTimeout(() => {
                navigate(routes.legalList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm văn bản pháp quy.', type: 'error' });
            console.error('Lỗi khi tạo văn bản pháp quy:', error);
        }
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.addLegal}>
            <Title text="Thêm mới văn bản pháp quy" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Tên Văn bản pháp quy</label>
                            <Field name="title" type="text" className={styles.input} />
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content">Tóm Tắt</label>
                            <Field name="content" type="text" className={styles.input} />
                            <ErrorMessage name="content" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Chọn File PDF</label>
                            <div {...getRootProps()} className={styles.dropzone}>
                                <input {...getInputProps()} />
                                <p>Kéo thả file vào đây, hoặc nhấn để chọn file</p>
                            </div>
                            <ErrorMessage name="file" component="div" className={styles.error} />
                        </div>
                        <div className={styles.filePreview}>
                            {files.map((file, index) => (
                                <div key={index} className={styles.fileContainer}>
                                    <p>{file.name}</p>
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
                            <label htmlFor="type">Loại Văn bản pháp quy</label>
                            <Field as="select" name="type" className={styles.input}>
                                <option value="">Chọn loại văn bản pháp quy</option>
                                {categories.map((category, index) => (
                                    <option key={category._id} value={index}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="legalType" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Thêm Văn bản pháp quy
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddLegal;
