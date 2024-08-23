import classNames from 'classnames/bind';
import React from 'react';
import Title from '~/components/Title';
import styles from './About.module.scss';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const About = () => (
    <article className={cx('wrapper')}>
        <Helmet>
            <title>Giới thiệu | VNETC</title>
            <meta name="description" content={'Thông tin về trang giới thiệu của VNETC.'} />
            <meta name="keywords" content="giới thiệu, VNETC, thông tin công ty" />
            <meta name="author" content="CÔNG TY CỔ PHẦN THÍ NGHIỆM CƠ ĐIỆN VIỆT NAM - VNETC" />
        </Helmet>
        <div className={cx('inner')}>
            <Title text="Tổng quan về VNETC" />
            <div className={cx('content')}>
                <img
                    src="https://res.cloudinary.com/ddmzboxzu/image/upload/v1721325167/iwo1jihkzk8jskxr6j7o.png"
                    alt="Trụ sở công ty VNETC"
                />
                <p>
                    <strong>1. Trụ sở chính: </strong> Số 22 Trần Hữu Dực – Tổ DP 5 – P. Tân Lợi – Tp Buôn Ma Thuột –
                    tỉnh Đăk Lăk – Việt Nam.
                </p>
                <ul>
                    <li>Tel/Fax: +84-262-3 97.71.71</li>
                    <li>Hotline: +84-968.17.47.47/+84-905.174.001</li>
                    <li>Website: vietnametc.com </li>
                    <li>Email: vietnam.etc.ltd@gmail.com</li>
                </ul>
                <p>
                    <strong>2. Văn phòng đại diện tại Quảng Ngãi: </strong> 303 Phan Đình Phùng, P. Chánh Lộ, TP. Quảng
                    Ngãi, T. Quảng Ngãi.
                </p>
                <ul>
                    <li>Trưởng VP: Ông Nguyễn Vân Hải </li>
                    <li>ĐT: 0942503822 </li>
                    <li>Website: vietnametc.com </li>
                    <li>Email: vanhai09031993@gmail.com</li>
                </ul>
                <p>
                    <strong>3. Chi nhánh Đà Nẵng: </strong> 20 Đa Phước 2, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, TP Đà
                    Nẵng.
                </p>
                <ul>
                    <li>Giám đốc: Ông Phùng Như Thuỷ </li>
                    <li>ĐT: 0905061997</li>
                    <li>Website: vietnametc.com </li>
                    <li>Email: nhuthuyant@gmail.com</li>
                </ul>
                <br />
                <h3>Hồ sơ pháp lý:</h3>
                <div className={cx('legal-images')}>
                    <img
                        src="https://res.cloudinary.com/ddmzboxzu/image/upload/v1724381419/Screenshot_2024-08-23_094742_td1epn.png"
                        alt=""
                        width="502"
                        height="732"
                    />
                    <img
                        src="https://res.cloudinary.com/ddmzboxzu/image/upload/v1724033205/hig0flfqnwkyhrbhlexq.jpg"
                        alt=""
                        width="535"
                        height="733"
                    />
                </div>
                <div className={cx('legal-images')}>
                    <img
                        src="https://res.cloudinary.com/ddmzboxzu/image/upload/v1724033215/zv8otn6ifwgmlnzar0wb.jpg"
                        alt=""
                        width="502"
                        height="735"
                    />
                </div>
            </div>
        </div>
    </article>
);

export default About;
