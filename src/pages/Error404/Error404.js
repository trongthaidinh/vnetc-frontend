import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Error404.module.scss';

const Error404 = () => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
                <h1 className={styles.errorTitle}>404</h1>
                <h2 className={styles.errorSubTitle}>Đang cập nhật</h2>
                <Link to="/" className={styles.backToHome}>
                    Quay lại Trang chủ
                </Link>
            </div>
        </div>
    );
};

export default Error404;
