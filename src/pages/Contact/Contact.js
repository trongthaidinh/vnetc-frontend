import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { createMessage } from '~/services/contactService';
import PushNotification from '~/components/PushNotification';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

const ContactPage = () => {
    const [, setMap] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            initMap();
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 12.688833, lng: 108.052747 },
            zoom: 15,
        });

        const poi = [{ key: 'companyLocation', location: { lat: 12.688833, lng: 108.052747 } }];

        poi.forEach(({ location }) => {
            const marker = new window.google.maps.Marker({
                position: location,
                map: map,
            });

            marker.addListener('click', () => {
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
                window.open(googleMapsUrl, '_blank');
            });
        });

        setMap(map);
    };

    const initialValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Họ và Tên là bắt buộc'),
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        phoneNumber: Yup.string().required('Số điện thoại là bắt buộc'),
        subject: Yup.string().required('Chủ đề là bắt buộc'),
        message: Yup.string().required('Nội dung tin nhắn là bắt buộc'),
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
                <div className={cx('map')} id="map"></div>
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
                                <span>Số điện thoại: 0123 456 789</span>
                            </div>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
                                <span>Email: info@company.com</span>
                            </div>
                            <div className={cx('infoItem')}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className={cx('icon')} />
                                <span>
                                    Địa chỉ: 22 Trần Hữu Dực, Tân Lợi, Thành phố Buôn Ma Thuột, Đắk Lắk, Vietnam
                                </span>
                            </div>
                        </div>
                        <div className={cx('socialLinks')}>
                            <FontAwesomeIcon icon={faFacebook} className={cx('socialIcon')} />
                            <FontAwesomeIcon icon={faLinkedinIn} className={cx('socialIcon')} />
                            <FontAwesomeIcon icon={faTwitter} className={cx('socialIcon')} />
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
