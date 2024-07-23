import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './OnlyHeaderLayout.module.scss';

const cx = classNames.bind(styles);

function OnlyHeaderLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
            <div className={cx('contact-buttons')}>
                <div className={cx('button', 'hotline')} onClick={() => (window.location.href = 'tel:0905174001')}>
                    <FontAwesomeIcon icon={faPhone} />
                </div>
                <div
                    className={cx('button', 'zalo')}
                    onClick={() => (window.location.href = 'https://zalo.me/0905174001')}
                ></div>
                <div
                    className={cx('button', 'facebook')}
                    onClick={() => (window.location.href = 'https://www.facebook.com/thinghiemcodien.vnetc/')}
                >
                    <FontAwesomeIcon icon={faFacebookF} />
                </div>
            </div>
        </div>
    );
}

export default OnlyHeaderLayout;
