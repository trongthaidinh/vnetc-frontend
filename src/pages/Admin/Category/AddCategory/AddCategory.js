import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '~/services/categoryService';
import PushNotification from '~/components/PushNotification';
import styles from './AddCategory.module.scss';
import routes from '~/config/routes';
import CATEGORY_TYPES from '~/constants/CategoryType/CategoryType';

const AddCategory = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: '', type: '' });

    const initialValues = {
        name: '',
        type: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên danh mục là bắt buộc'),
        type: Yup.number()
            .required('Loại danh mục là bắt buộc')
            .min(1, 'Giá trị không hợp lệ')
            .max(Object.keys(CATEGORY_TYPES).length, 'Giá trị không hợp lệ'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await addCategory(values);
            setNotification({ message: 'Thêm danh mục thành công!', type: 'success' });
            resetForm();
            navigate(routes.categoryList);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm danh mục.', type: 'error' });
            console.error('Lỗi khi tạo danh mục:', error);
        }
    };

    return (
        <div className={styles.addCategory}>
            <h2>Thêm Danh mục</h2>
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Tên Danh mục</label>
                            <Field name="name" type="text" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="type">Loại Danh mục</label>
                            <Field as="select" name="type" className={styles.input}>
                                <option value="">Chọn loại danh mục</option>
                                {Object.entries(CATEGORY_TYPES).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="type" component="div" className={styles.error} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Thêm Danh mục
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddCategory;
