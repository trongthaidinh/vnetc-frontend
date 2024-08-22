import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getLegalById, updateLegal } from '~/services/legalService';
import { getCategoriesByType } from '~/services/categoryService';
import PushNotification from '~/components/PushNotification';
import styles from './UpdateLegal.module.scss';
import routes from '~/config/routes';
import Title from '~/components/Title';
import { useDropzone } from 'react-dropzone';
import LoadingScreen from '~/components/LoadingScreen';

const UpdateLegal = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [attachment, setAttachment] = useState(null);
    const [initialValues, setInitialValues] = useState(null);

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

        const fetchLegal = async () => {
            try {
                const legal = await getLegalById(id);
                setInitialValues({
                    title: legal.title,
                    content: legal.content,
                    type: legal.type,
                    attachments: legal.attachments || '',
                });
                setAttachment(legal.attachments || null);
            } catch (error) {
                console.error('Lỗi khi tải văn bản pháp quy:', error);
            }
        };

        fetchCategories();
        fetchLegal();
    }, [id]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setAttachment(acceptedFiles[0]);
        },
        accept: 'application/pdf',
        maxFiles: 1,
    });

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('content', values.content);
        if (attachment) {
            formData.append('file', attachment);
        }
        formData.append('type', values.type);

        try {
            await updateLegal(id, formData);
            setNotification({ message: 'Cập nhật văn bản pháp quy thành công!', type: 'success' });
            resetForm();
            setAttachment(null);
            navigate(routes.legalList);
        } catch (error) {
            setNotification({ message: 'Lỗi khi cập nhật văn bản pháp quy.', type: 'error' });
            console.error('Lỗi khi cập nhật văn bản pháp quy:', error);
        }
    };

    const removeAttachment = () => {
        setAttachment(null);
    };

    if (!initialValues) return <LoadingScreen />;

    return (
        <div className={styles.updateLegal}>
            <Title text="Cập nhật văn bản pháp quy" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Tên văn bản pháp quy</label>
                            <Field name="title" type="text" className={styles.input} />
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content">Tóm Tắt</label>
                            <Field name="content" type="text" className={styles.input} />
                            <ErrorMessage name="content" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Chọn File PDF và Hình ảnh</label>
                            <div {...getRootProps()} className={styles.dropzone}>
                                <input {...getInputProps()} />
                                <p>Kéo thả file vào đây, hoặc nhấn để chọn file</p>
                            </div>
                        </div>
                        <div className={styles.filePreview}>
                            {attachment ? (
                                <div className={styles.fileContainer}>
                                    <p>{attachment.name || attachment}</p>
                                    <button type="button" onClick={removeAttachment} className={styles.removeButton}>
                                        X
                                    </button>
                                </div>
                            ) : (
                                <p>Chưa có tệp đính kèm</p>
                            )}
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
                            <ErrorMessage name="type" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Cập Nhật Văn bản pháp quy
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateLegal;
