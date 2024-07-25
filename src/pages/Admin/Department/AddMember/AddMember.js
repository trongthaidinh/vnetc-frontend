import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addMember, getDepartments } from '~/services/teamService';
import PushNotification from '~/components/PushNotification';
import styles from './AddMember.module.scss';
import routes from '~/config/routes';

const AddMember = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const initialValues = {
        name: '',
        positionDetails: { position: '', departmentId: '' },
        yearOfBirth: '',
        qualification: '',
        seniority: '',
        image: null,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên thành viên là bắt buộc'),
        positionDetails: Yup.object({
            position: Yup.string().required('Phòng ban là bắt buộc'),
            departmentId: Yup.string().required('Phòng ban là bắt buộc'),
        }),
        yearOfBirth: Yup.number()
            .required('Năm sinh là bắt buộc')
            .min(1900, 'Năm sinh không hợp lệ')
            .max(new Date().getFullYear(), 'Năm sinh không hợp lệ'),
        qualification: Yup.string().required('Vị trí là bắt buộc'),
        seniority: Yup.number().required('Thâm niên là bắt buộc').min(0, 'Thâm niên không hợp lệ'),
        image: Yup.mixed().required('Hình ảnh là bắt buộc'),
    });

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const fetchedDepartments = await getDepartments();
                const mappedDepartments = fetchedDepartments.map((department, index) => ({
                    ...department,
                    displayValue: index.toString(),
                }));
                setDepartments(mappedDepartments);
            } catch (error) {
                console.error('Lỗi khi tải phòng ban:', error);
            }
        };
        fetchDepartments();
    }, []);

    const handleImageUpload = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFieldValue('image', file);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('position', values.positionDetails.position);
        formData.append('departmentId', values.positionDetails.departmentId);
        formData.append('yearOfBirth', values.yearOfBirth);
        formData.append('qualification', values.qualification);
        formData.append('seniority', values.seniority);
        formData.append('image', values.image);

        try {
            await addMember(formData, values.positionDetails.departmentId);
            resetForm();
            setNotification({ message: 'Thêm thành viên thành công!', type: 'success' });

            setTimeout(() => {
                navigate(routes.teamList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi thêm thành viên.', type: 'error' });
            console.error('Lỗi khi tạo thành viên:', error);
        }
    };

    return (
        <div className={styles.addMember}>
            <h2>Thêm Thành viên</h2>
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Tên Thành viên</label>
                            <Field name="name" type="text" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="position">Phòng ban</label>
                            <Field
                                as="select"
                                name="positionDetails.position"
                                className={styles.input}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    const selectedDepartment = departments.find(
                                        (department) => department.displayValue === selectedValue,
                                    );
                                    setFieldValue('positionDetails.position', selectedValue);
                                    setFieldValue(
                                        'positionDetails.departmentId',
                                        selectedDepartment ? selectedDepartment._id : '',
                                    );
                                }}
                            >
                                <option value="">Chọn phòng ban</option>
                                {departments.map((department) => (
                                    <option key={department._id} value={department.displayValue}>
                                        {department.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="positionDetails.position" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="qualification">Vị trí</label>
                            <Field name="qualification" type="text" className={styles.input} />
                            <ErrorMessage name="qualification" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="yearOfBirth">Năm Sinh</label>
                            <Field name="yearOfBirth" type="number" className={styles.input} />
                            <ErrorMessage name="yearOfBirth" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="seniority">Thâm niên</label>
                            <Field name="seniority" type="number" className={styles.input} />
                            <ErrorMessage name="seniority" component="div" className={styles.error} />
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
                                    src={URL.createObjectURL(values.image)}
                                    alt="Member"
                                    className={styles.memberImage}
                                />
                            </div>
                        )}
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Thêm Thành viên
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddMember;
