import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';

const Dropdown = ({ isVisible, notifications, isUserDropdown }) => {
    return (
        <div className={`${styles.dropdown} ${isVisible ? styles.visible : ''}`}>
            {isUserDropdown ? (
                notifications.map((item, index) => (
                    <div key={index} className={styles.dropdownItem}>
                        <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                        {item.text}
                    </div>
                ))
            ) : notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <div key={index} className={styles.dropdownItem}>
                        <FontAwesomeIcon icon={notification.icon} className={styles.icon} />
                        <div className={styles.notificationContent}>
                            <div className={styles.notificationTitle}>{notification.title}</div>
                            <div className={styles.notificationMessage}>{notification.message}</div>
                        </div>
                    </div>
                ))
            ) : (
                <div className={styles.noNotifications}>No new messages</div>
            )}
        </div>
    );
};

export default Dropdown;
