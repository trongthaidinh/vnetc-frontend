import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, updateProject } from '~/services/projectService';
import { getCategoriesByType } from '~/services/categoryService';
import CustomEditor from '~/components/CustomEditor';
import PushNotification from '~/components/PushNotification';
import styles from './UpdateProject.module.scss';
import routes from '~/config/routes';
import LoadingScreen from '~/components/LoadingScreen';
import Title from '~/components/Title';

const UpdateProject = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [initialValues, setInitialValues] = useState(null);

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên dự án là bắt buộc'),
        summary: Yup.string().required('Tóm tắt là bắt buộc'),
        image: Yup.string().required('Hình ảnh là bắt buộc'),
        projectType: Yup.string().required('Loại dự án là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategoriesByType(4);
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Lỗi khi tải danh mục:', error);
            }
        };

        const fetchProject = async () => {
            try {
                const project = await getProjectById(id);
                setInitialValues({
                    name: project.name,
                    summary: project.summary,
                    image: project.image || '',
                    projectType: project.projectType,
                    content: project.content,
                });
            } catch (error) {
                console.error('Lỗi khi tải dự án:', error);
            }
        };

        fetchCategories();
        fetchProject();
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
            await updateProject(id, formData);
            setNotification({ message: 'Cập nhật dự án thành công!', type: 'success' });
            resetForm();
            navigate(routes.projectList);
        } catch (error) {
            setNotification({ message: 'Lỗi khi cập nhật dự án.', type: 'error' });
            console.error('Lỗi khi cập nhật dự án:', error);
        }
    };

    if (!initialValues) return <LoadingScreen />;

    return (
        <div className={styles.updateProject}>
            <Title text="Cập nhật dự án" />
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
                                    alt="Projects"
                                    className={styles.projectImage}
                                />
                            </div>
                        )}
                        <div className={styles.formGroup}>
                            <label htmlFor="projectType">Loại dự án</label>
                            <Field as="select" name="projectType" className={styles.input}>
                                <option value="">Chọn loại dịch vụ</option>
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
                            Cập Nhật Dự án
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateProject;
