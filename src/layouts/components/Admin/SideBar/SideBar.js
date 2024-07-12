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
    faNewspaper,
    faDiagramProject,
    faLayerGroup,
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
                [menu]: !prev[menu],
                ...(prev[menu]
                    ? {}
                    : Object.keys(prev).reduce((acc, key) => {
                          if (key !== menu) acc[key] = false;
                          return acc;
                      }, {})),
            }));
        }
    };

    return (
        <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
            <div className={styles.logo}>
                <strong>VNETC</strong>
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
                        <li>Menu chính</li>
                        <li>Menu phụ</li>
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
                        <li>Danh sách người dùng</li>
                        <li>Thêm người dùng</li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('productManagement')}>
                        <FontAwesomeIcon icon={faBox} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lí sản phẩm
                                    <FontAwesomeIcon
                                        icon={openMenus.productManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.productManagement ? styles.open : ''}`}>
                        <li>Danh sách sản phẩm</li>
                        <li>Thêm sản phẩm</li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('newsManagement')}>
                        <FontAwesomeIcon icon={faNewspaper} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lí tin tức
                                    <FontAwesomeIcon
                                        icon={openMenus.newsManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.newsManagement ? styles.open : ''}`}>
                        <li>Danh sách tin tức</li>
                        <li>Thêm tin tức</li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('projectManagement')}>
                        <FontAwesomeIcon icon={faDiagramProject} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lí dự án
                                    <FontAwesomeIcon
                                        icon={openMenus.projectManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.projectManagement ? styles.open : ''}`}>
                        <li>Danh sách dự án</li>
                        <li>Thêm dự án</li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('serviceManagement')}>
                        <FontAwesomeIcon icon={faLayerGroup} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lí dịch vụ
                                    <FontAwesomeIcon
                                        icon={openMenus.serviceManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.serviceManagement ? styles.open : ''}`}>
                        <li>Danh sách dịch vụ</li>
                        <li>Thêm dịch vụ</li>
                    </ul>
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
