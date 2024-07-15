import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faChevronDown, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import styles from './Header.module.scss';
import httpRequest from '~/utils/httpRequest'; // Adjust the import based on your structure

const Header = () => {
    const [isEmailDropdownVisible, setIsEmailDropdownVisible] = useState(false);
    const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
    const emailDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            emailDropdownRef.current &&
            !emailDropdownRef.current.contains(event.target) &&
            userDropdownRef.current &&
            !userDropdownRef.current.contains(event.target)
        ) {
            setIsEmailDropdownVisible(false);
            setIsUserDropdownVisible(false);
        }
    };

    const handleLogout = async () => {
        try {
            await httpRequest.post('/logout'); // Update with your actual logout endpoint
            localStorage.removeItem('token'); // Clear the token
            window.location.href = '/login'; // Redirect to the login page
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const emailNotifications = [
        { icon: faEnvelope, title: 'New Message', message: 'You have received a new message.' },
        { icon: faEnvelope, title: 'New Message', message: 'Another message received.' },
    ];

    const userDropdownItems = [
        { icon: faUser, text: 'Profile' },
        { icon: faSignOutAlt, text: 'Logout', action: handleLogout },
    ];

    return (
        <div className={styles.header}>
            <div
                className={styles.iconWrapper}
                ref={emailDropdownRef}
                onClick={() => {
                    setIsEmailDropdownVisible(!isEmailDropdownVisible);
                    setIsUserDropdownVisible(false);
                }}
            >
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                <Dropdown
                    isVisible={isEmailDropdownVisible}
                    notifications={emailNotifications}
                    isUserDropdown={false}
                />
            </div>
            <div
                className={styles.userWrapper}
                ref={userDropdownRef}
                onClick={() => {
                    setIsUserDropdownVisible(!isUserDropdownVisible);
                    setIsEmailDropdownVisible(false);
                }}
            >
                <span className={styles.userName}>User Name</span>
                <FontAwesomeIcon icon={faChevronDown} className={styles.chevronIcon} />
                <Dropdown isVisible={isUserDropdownVisible} notifications={userDropdownItems} isUserDropdown={true} />
            </div>
        </div>
    );
};

export default Header;
