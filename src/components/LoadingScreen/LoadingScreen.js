import React from 'react';
import styles from './LoadingScreen.module.scss';
import images from '~/assets/images';

const LoadingScreen = () => {
    return (
        <div className={styles.loading}>
            <img src={images.logo} alt="Logo" className={styles.logo} />
            <div className={styles.loadingWrapper}>
                <div className={styles.spinnerContainer}>
                    <div className={styles.dot1}></div>
                    <div className={styles.dot2}></div>
                    <div className={styles.dot3}></div>
                </div>
                <div className={styles.loadingText}>Đang tải</div>
            </div>
        </div>
    );
};

export default LoadingScreen;
