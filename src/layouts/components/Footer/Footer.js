import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import companyLogo from '~/assets/images/logo_vnetc.png';
import boCongThuongLogo from '~/assets/images/bocongthuong.png';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Footer = () => {
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
                            Đang online: <span className={cx('online-number')}>123</span>
                        </span>{' '}
                        |{' '}
                        <span>
                            <FontAwesomeIcon className={cx('footer-icon-dot')} icon={faCircle} />
                            Tổng số lượt truy cập: <span className={cx('online-access')}>45678</span>
                        </span>
                    </div>
                    <div className={cx('boCongThuong')}>
                        <img src={boCongThuongLogo} alt="Bộ Công Thương" />
                    </div>
                    <div className={cx('contactInfo')}>
                        <div className={cx('contactItem')}>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>+1 234 567 890</span>
                        </div>
                        <div className={cx('contactItem')}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>contact@example.com</span>
                        </div>
                    </div>
                    <div className={cx('socialIcons')}>
                        <a href="https://facebook.com">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="https://twitter.com">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://instagram.com">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://linkedin.com">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                    </div>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Thông tin doanh nghiệp</h4>
                    <ul>
                        <li>
                            <a href="/about">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Tổng quan về VNETC
                            </a>
                        </li>
                        <li>
                            <a href="/vision-mission-values">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Tầm nhìn - Sứ mệnh - Giá trị
                            </a>
                        </li>
                        <li>
                            <a href="/organizational">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Sơ đồ tổ chức
                            </a>
                        </li>
                        <li>
                            <a href="/quality-goals">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Mục tiêu chất lượng
                            </a>
                        </li>
                        <li>
                            <a href="/profile">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Hồ sơ năng lực
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Lĩnh vực hoạt động</h4>
                    <ul>
                        <li>
                            <a href="/products">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Sản phẩm
                            </a>
                        </li>
                        <li>
                            <a href="/services">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Dịch vụ
                            </a>
                        </li>
                        <li>
                            <a href="/projects">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Dự án
                            </a>
                        </li>
                        <li>
                            <a href="/co-operate">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Hợp tác
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={cx('footerColumn')}>
                    <h4>Các thông tin khác</h4>
                    <ul>
                        <li>
                            <a href="/privacy">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Điều khoản và chính sách
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Tri ân khách hàng
                            </a>
                        </li>
                        <li>
                            <a href="/contact">
                                <FontAwesomeIcon className={cx('footer-chevon-icon')} icon={faChevronRight} />
                                Liên hệ với chúng tôi
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('bottomBar')}>
                <p>&copy; Copyright Công Ty Cổ Phần Thí Nghiệm Cơ Điện Việt Nam. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
