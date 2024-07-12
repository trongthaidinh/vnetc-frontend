import React, { useState } from 'react';
import styles from './SideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretRight,
    faCaretLeft,
    faTachometerAlt,
    faClipboardList,
    faEnvelope,
    faUsers,
    faBox,
    faCogs,
    faChevronRight,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenus, setOpenMenus] = useState({});

    const toggleSidebar = () => {
        if (!isCollapsed) {
            setOpenMenus({});
        }
        setIsCollapsed(!isCollapsed);
    };

    const toggleMenu = (menu) => {
        if (isCollapsed) {
            setIsCollapsed(false);
        } else {
            setOpenMenus((prev) => ({
                ...prev,
                [menu]: !prev[menu],
            }));
        }
    };

    return (
        <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
            <div className={styles.logo}>
                <span>Logo</span>
                <FontAwesomeIcon
                    icon={isCollapsed ? faCaretRight : faCaretLeft}
                    onClick={toggleSidebar}
                    className={styles.toggleIcon}
                />
            </div>
            <ul className={styles.menu}>
                <li>
                    <div className={styles.menuItem}>
                        <FontAwesomeIcon icon={faTachometerAlt} className={styles.menuIcon} />
                        <span className={styles.menuText}>{!isCollapsed && 'Bảng điều khiển'}</span>
                    </div>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('menuManagement')}>
                        <FontAwesomeIcon icon={faClipboardList} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lí Menu
                                    <FontAwesomeIcon
                                        icon={openMenus.menuManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.menuManagement ? styles.open : ''}`}>
                        <li>Menu Phụ 1</li>
                        <li>Menu Phụ 2</li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem}>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.menuIcon} />
                        <span className={styles.menuText}>{!isCollapsed && 'Quản lí tin nhắn'}</span>
                    </div>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('userManagement')}>
                        <FontAwesomeIcon icon={faUsers} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lí người dùng
                                    <FontAwesomeIcon
                                        icon={openMenus.userManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.userManagement ? styles.open : ''}`}>
                        <li>Menu Phụ 1</li>
                        <li>Menu Phụ 2</li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem}>
                        <FontAwesomeIcon icon={faBox} className={styles.menuIcon} />
                        <span className={styles.menuText}>{!isCollapsed && 'Quản lí sản phẩm'}</span>
                    </div>
                </li>
                <li>
                    <div className={styles.menuItem}>
                        <FontAwesomeIcon icon={faCogs} className={styles.menuIcon} />
                        <span className={styles.menuText}>{!isCollapsed && 'Cài đặt chung'}</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
