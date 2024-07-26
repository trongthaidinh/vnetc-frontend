import React from 'react';
import styles from './Loading.module.scss';

const Loading = ({ size = 'medium', text = 'Loading...', show = true }) => {
    if (!show) return null;

    return (
        <div className={`${styles.loading} ${styles[size]}`}>
            <div className={styles.spinnerContainer}>
                <div className={styles.dot1}></div>
                <div className={styles.dot2}></div>
                <div className={styles.dot3}></div>
            </div>
            <div className={styles.loadingText}>{text}</div>
        </div>
    );
};

export default Loading;
