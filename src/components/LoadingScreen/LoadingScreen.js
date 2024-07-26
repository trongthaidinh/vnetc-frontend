import React from 'react';
import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.spinnerContainer}>
                <div className={styles.dot1}></div>
                <div className={styles.dot2}></div>
                <div className={styles.dot3}></div>
            </div>
            <div className={styles.loadingText}>Đang tải</div>
        </div>
    );
};

export default LoadingScreen;
