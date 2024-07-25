import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import companyLogo from '~/assets/images/logo_vnetc.png';
import boCongThuongLogo from '~/assets/images/bocongthuong.png';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import io from 'socket.io-client';

const cx = classNames.bind(styles);

const Footer = () => {
    const [stats, setStats] = useState({ online: 0, total: 0 });

    useEffect(() => {
        const socket = io(`${process.env.REACT_APP_HOST}`, {
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('stats', (data) => {
            console.log('Received stats:', data);
            setStats(data);
        });

        return () => socket.disconnect();
    }, []);
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('footerLeft', 'footerColumnWide')}>
                    <Link to="/">
                        <img src={companyLogo} alt="Company Logo" className={cx('logo')} />
                    </Link>
                    <h5>CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM</h5>
                    <p>Số 22 Trần Hữu Dực, tổ 5, Phường Tân Lợi, TP. Buôn Ma Thuột, Tỉnh Đắk Lắk, Việt Nam</p>
                    <div className={cx('onlineStatus')}>
                        <span>
                            <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                            Đang online: <span className={cx('online-number')}>{stats.online}</span>
                        </span>{' '}
                        |{' '}
                        <span>
                            <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                            Tổng số lượt truy cập: <span className={cx('online-access')}>{stats.total}</span>
                        </span>
                    </div>
                    <div className={cx('boCongThuong')}>
                        <img src={boCongThuongLogo} alt="Bộ Công Thương" />
                    </div>
                    <div className={cx('contactInfo')}>
                        <div className={cx('contactItem')}>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>+84 262 397 7171</span>
                        </div>
                        <div className={cx('contactItem')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>vietnam.etc.ltd@gmail.com</span>
                        </div>
                    </div>
                    <div className={cx('socialIcons')}>
                        <Link to="https://facebook.com">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </Link>
                        <Link to="https://twitter.com">
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                        <Link to="https://instagram.com">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                        <Link to="https://linkedin.com">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </Link>
                    </div>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Thông tin doanh nghiệp</h4>
                    <ul>
                        <li>
                            <Link to="/about">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Tổng quan về VNETC
                            </Link>
                        </li>
                        <li>
                            <Link to="/about/vision-mission-values">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Tầm nhìn - Sứ mệnh - Giá trị
                            </Link>
                        </li>
                        <li>
                            <Link to="/about/organizational">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Sơ đồ tổ chức
                            </Link>
                        </li>
                        <li>
                            <Link to="/about/quality-goals">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Mục tiêu chất lượng
                            </Link>
                        </li>
                        <li>
                            <Link to="/about/capacity-profile">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Hồ sơ năng lực
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Lĩnh vực hoạt động</h4>
                    <ul>
                        <li>
                            <Link to="/products">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link to="/services">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Dịch vụ
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Dự án
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Hợp tác
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Các thông tin khác</h4>
                    <ul>
                        <li>
                            <Link to="/privacy">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Điều khoản và chính sách
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Tri ân khách hàng
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Liên hệ với chúng tôi
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('bottomBar')}>
                <p>
                    &copy; Copyright Công Ty Cổ Phần Thí Nghiệm Cơ Điện Việt Nam. All Rights Reserved. Thiết kế bởi{' '}
                    <a href="https://www.takatech.com.vn/" target="_blank" rel="noopener noreferrer">
                        Takatech
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
