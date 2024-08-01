import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getMemberById, updateMember, getDepartments } from '~/services/teamService';
import PushNotification from '~/components/PushNotification';
import styles from './UpdateMember.module.scss';
import routes from '~/config/routes';
import LoadingScreen from '~/components/LoadingScreen';
import Title from '~/components/Title';

const UpdateMember = () => {
    const navigate = useNavigate();
    const { id, departmentId } = useParams();
    const [departments, setDepartments] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [initialValues, setInitialValues] = useState(null);

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên thành viên là bắt buộc'),
        positionDetails: Yup.object({
            position: Yup.string().required('Vị trí là bắt buộc'),
            departmentId: Yup.string().required('Ban là bắt buộc'),
        }),
        yearOfBirth: Yup.number()
            .required('Năm sinh là bắt buộc')
            .min(1900, 'Năm sinh không hợp lệ')
            .max(new Date().getFullYear(), 'Năm sinh không hợp lệ'),
        qualification: Yup.string().required('Vị trí là bắt buộc'),
        seniority: Yup.number().required('Kinh nghiệm là bắt buộc').min(0, 'Kinh nghiệm không hợp lệ'),
        image: Yup.mixed(),
    });

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const fetchedDepartments = await getDepartments();
                setDepartments(fetchedDepartments);
            } catch (error) {
                console.error('Lỗi khi tải phòng ban:', error);
            }
        };

        const fetchMember = async () => {
            try {
                const member = await getMemberById(id, departmentId);
                setInitialValues({
                    name: member.name,
                    positionDetails: {
                        position: member.position,
                        departmentId: member.departmentId,
                    },
                    qualification: member.qualification,
                    yearOfBirth: member.yearOfBirth,
                    seniority: member.seniority || '', // Thêm trường seniority
                    image: member.image || null,
                });
            } catch (error) {
                console.error('Lỗi khi tải thành viên:', error);
            }
        };

        fetchDepartments();
        fetchMember();
    }, [id, departmentId]);

    const handleImageUpload = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFieldValue('image', file);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('position', values.positionDetails.position);
        formData.append('departmentId', values.positionDetails.departmentId);
        formData.append('qualification', values.qualification);
        formData.append('yearOfBirth', values.yearOfBirth);
        formData.append('seniority', values.seniority);
        if (values.image) {
            formData.append('image', values.image);
        }

        try {
            await updateMember(id, departmentId, formData);
            setNotification({ message: 'Cập nhật thành viên thành công!', type: 'success' });
            resetForm();
            setTimeout(() => {
                navigate(routes.memberList);
            }, 1000);
        } catch (error) {
            setNotification({ message: 'Lỗi khi cập nhật thành viên.', type: 'error' });
            console.error('Lỗi khi cập nhật thành viên:', error);
        }
    };

    if (!initialValues) return <LoadingScreen />;

    return (
        <div className={styles.updateMember}>
            <Title text="Cập nhật thành viên" />
            {notification.message && <PushNotification message={notification.message} type={notification.type} />}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Tên Thành Viên</label>
                            <Field name="name" type="text" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="positionDetails.position">Ban</label>
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
                                <option value="">Chọn ban</option>
                                {departments.map((department, index) => (
                                    <option key={department._id} value={index}>
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
                            <label htmlFor="seniority">Kinh nghiệm</label>
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
                                    src={
                                        typeof values.image === 'string'
                                            ? values.image
                                            : URL.createObjectURL(values.image)
                                    }
                                    alt="Member"
                                    className={styles.memberImage}
                                />
                            </div>
                        )}

                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            Cập Nhật Thành Viên
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateMember;
