/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faMapMarkerAlt,
    faPhone,
    faMobileAlt,
    faWrench,
    faCogs,
    faChartLine,
    faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { createMessage } from '~/services/contactService';
import PushNotification from '~/components/PushNotification';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

const ContactPage = () => {
    const [notification, setNotification] = useState({ message: '', type: '' });

    const initialValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Vui lòng nhập Họ và Tên của bạn!'),
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email!'),
        phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
        subject: Yup.string().required('Vui lòng chọn chủ đề!'),
        message: Yup.string().required('Vui lòng nhập nội dung tin nhắn!'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await createMessage(values);
            setNotification({ message: 'Gửi tin nhắn thành công!', type: 'success' });
            resetForm();
        } catch (error) {
            console.error('Error sending message:', error);
            setNotification({ message: 'Lỗi khi gửi tin nhắn.', type: 'error' });
        }
    };

    return (
        <div className={cx('contactPage')}>
            <div className={cx('mapContainer')}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.27342674958496!2d108.052657970545!3d12.688940890483984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171f7d7415f7d55%3A0x5a3cd6dc81a8de0d!2sVietnam%20Electromechanical%20Testing%20Joint%20Stock%20Company!5e0!3m2!1sen!2s!4v1721701975769!5m2!1sen!2s"
                    width="100%"
                    height="600"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className={cx('inner')}>
                <div className={cx('formWrapper')}>
                    <div className={cx('contactInfo')}>
                        <div className={cx('infoTitle')}>
                            <h2 className={cx('title')}>Thông tin liên hệ</h2>
                            <p className={cx('subTitle')}>Hãy liên hệ với chúng tôi!</p>
                        </div>
                        <div className={cx('infoDetails')}>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faPhone} className={cx('icon')} />
                                <a href="tel:02623977171">Số điện thoại: 02623 977 171 (Văn phòng công ty)</a>
                            </div>
                            <div className={cx('infoItem')}>
                                <span>
                                    <FontAwesomeIcon icon={faMobileAlt} className={cx('icon')} />
                                    Hotline theo mảng phụ trách:
                                    <ul className={cx('contact-list')}>
                                        <li>
                                            <FontAwesomeIcon icon={faWrench} className={cx('icon')} />
                                            <a href="tel:0931951140">Thí nghiệm điện: 093 1951 140 (Mr. Phi)</a>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faCogs} className={cx('icon')} />
                                            <a href="tel:0911711933">
                                                QLVH và xử lý sự cố lưới điện: 091 1711 933 (Mr. Phước)
                                            </a>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faChartLine} className={cx('icon')} />
                                            <a href="tel:0982064747">Lập dự toán kinh doanh: 098 2064 747 (Ms. Ngọc)</a>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faFileAlt} className={cx('icon')} />
                                            <a href="tel:0932585866">Tài chính - Tổng hợp: 093 2585 866 (Ms. Mai)</a>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faFileAlt} className={cx('icon')} />
                                            <a href="tel:0971787996">Hồ sơ pháp lý kỹ thuật: 097 1787 996 (Mr. Kiệt)</a>
                                        </li>
                                    </ul>
                                </span>
                            </div>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
                                <a href="mailto:vietnam.etc.ltd@gmail.com">Email: vietnam.etc.ltd@gmail.com</a>
                            </div>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className={cx('icon')} />
                                <span>
                                    Địa chỉ: 22 Trần Hữu Dực, Tân Lợi, Thành phố Buôn Ma Thuột, Đắk Lắk, Vietnam
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('contactForm')}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className={cx('formGroup')}>
                                        <label htmlFor="fullName">Họ và Tên</label>
                                        <Field type="text" id="fullName" name="fullName" className={cx('input')} />
                                        <ErrorMessage name="fullName" component="div" className={cx('error')} />
                                    </div>
                                    <div className={cx('formGroup', 'formRow')}>
                                        <div className={cx('formHalf')}>
                                            <label htmlFor="email">Email</label>
                                            <Field type="email" id="email" name="email" className={cx('input')} />
                                            <ErrorMessage name="email" component="div" className={cx('error')} />
                                        </div>
                                        <div className={cx('formHalf')}>
                                            <label htmlFor="phoneNumber">Số điện thoại</label>
                                            <Field
                                                type="text"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                className={cx('input')}
                                            />
                                            <ErrorMessage name="phoneNumber" component="div" className={cx('error')} />
                                        </div>
                                    </div>
                                    <div className={cx('formGroup')}>
                                        <label>Chủ đề</label>
                                        <div className={cx('subject')}>
                                            <Field
                                                type="radio"
                                                name="subject"
                                                id="subject1"
                                                value="Dịch vụ"
                                                className={cx('customRadio')}
                                                checked
                                            />
                                            <label htmlFor="subject1" className={cx('radioLabel')}>
                                                Dịch vụ
                                            </label>
                                            <Field
                                                type="radio"
                                                name="subject"
                                                id="subject2"
                                                value="Sản phẩm"
                                                className={cx('customRadio')}
                                            />
                                            <label htmlFor="subject2" className={cx('radioLabel')}>
                                                Sản phẩm
                                            </label>
                                            <Field
                                                type="radio"
                                                name="subject"
                                                id="subject3"
                                                value="Khác"
                                                className={cx('customRadio')}
                                            />
                                            <label htmlFor="subject3" className={cx('radioLabel')}>
                                                Khác
                                            </label>
                                        </div>
                                        <ErrorMessage name="subject" component="div" className={cx('error')} />
                                    </div>
                                    <div className={cx('formGroup')}>
                                        <label htmlFor="message">Nội dung tin nhắn</label>
                                        <Field as="textarea" id="message" name="message" className={cx('textarea')} />
                                        <ErrorMessage name="message" component="div" className={cx('error')} />
                                    </div>
                                    <div className={cx('buttonContainer')}>
                                        <Button primary type="submit" disabled={isSubmitting}>
                                            Gửi tin nhắn
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <PushNotification message={notification.message} type={notification.type} />
        </div>
    );
};

export default ContactPage;
