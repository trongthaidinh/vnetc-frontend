import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import styles from './Contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const ContactPage = () => {
    const [, setMap] = useState(null);

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
                        <div className={cx('formGroup')}>
                            <label htmlFor="fullName">Họ và Tên</label>
                            <input type="text" id="fullName" name="fullName" />
                        </div>
                        <div className={cx('formGroup', 'formRow')}>
                            <div className={cx('formHalf')}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" />
                            </div>
                            <div className={cx('formHalf')}>
                                <label htmlFor="phoneNumber">Số điện thoại</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" />
                            </div>
                        </div>
                        <div className={cx('formGroup')}>
                            <label>Chủ đề</label>
                            <div className={cx('subject')}>
                                <input
                                    type="radio"
                                    name="subject"
                                    id="subject1"
                                    value="subject1"
                                    className={cx('customRadio')}
                                />
                                <label htmlFor="subject1" className={cx('radioLabel')}>
                                    Chủ đề 1
                                </label>

                                <input
                                    type="radio"
                                    name="subject"
                                    id="subject2"
                                    value="subject2"
                                    className={cx('customRadio')}
                                />
                                <label htmlFor="subject2" className={cx('radioLabel')}>
                                    Chủ đề 2
                                </label>

                                <input
                                    type="radio"
                                    name="subject"
                                    id="subject3"
                                    value="subject3"
                                    className={cx('customRadio')}
                                />
                                <label htmlFor="subject3" className={cx('radioLabel')}>
                                    Chủ đề 3
                                </label>
                            </div>
                        </div>

                        <div className={cx('formGroup')}>
                            <label htmlFor="message">Nội dung tin nhắn</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                placeholder="Viết tin nhắn của bạn"
                            ></textarea>
                        </div>
                        <Button primary className={cx('formSubmitBtn')}>
                            Gửi tin nhắn
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
