import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './SideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretRight,
    faCaretLeft,
    faTachometerAlt,
    faClipboardList,
    faEnvelope,
    faUsers,
    // faBox,
    faChartLine,
    faCogs,
    faChevronRight,
    faChevronDown,
    faNewspaper,
    faDiagramProject,
    faLayerGroup,
    faHandshake,
    faBookOpen,
    faInfoCircle,
    faUserFriends,
    faListAlt,
} from '@fortawesome/free-solid-svg-icons';
import routes from '~/config/routes';
import images from '~/assets/images';

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
            <div className={styles.logoWrapper}>
                <Link to={routes.admin}>
                    <img src={images.logo} alt="Company Logo" className={styles.logo} />
                </Link>
                <FontAwesomeIcon
                    icon={isCollapsed ? faCaretRight : faCaretLeft}
                    onClick={toggleSidebar}
                    className={styles.toggleIcon}
                />
            </div>
            <ul className={styles.menu}>
                <li>
                    <NavLink to={routes.admin} className={styles.menuItem}>
                        <FontAwesomeIcon icon={faTachometerAlt} className={styles.menuIcon} />
                        <span className={styles.menuText}>{!isCollapsed && 'Bảng điều khiển'}</span>
                    </NavLink>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('menuManagement')}>
                        <FontAwesomeIcon icon={faClipboardList} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý Menu
                                    <FontAwesomeIcon
                                        icon={openMenus.menuManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.menuManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.navigationList}>Danh sách Menu</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addNavigation}>Thêm Menu</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('categoryManagement')}>
                        <FontAwesomeIcon icon={faListAlt} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý danh mục
                                    <FontAwesomeIcon
                                        icon={openMenus.categoryManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.categoryManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.categoryList}>Danh sách danh mục</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addCategory}>Thêm danh mục</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink to={routes.messagesList} className={styles.menuItem}>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.menuIcon} />
                        <span className={styles.menuText}>{!isCollapsed && 'Quản lý tin nhắn'}</span>
                    </NavLink>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('userManagement')}>
                        <FontAwesomeIcon icon={faUsers} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý người dùng
                                    <FontAwesomeIcon
                                        icon={openMenus.userManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.userManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.userList}>Danh sách người dùng</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addUser}>Thêm người dùng</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('activityManagement')}>
                        <FontAwesomeIcon icon={faChartLine} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý hoạt động
                                    <FontAwesomeIcon
                                        icon={openMenus.activityManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.activityManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.activityList}>Danh sách hoạt động</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addActivity}>Thêm hoạt động</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('newsManagement')}>
                        <FontAwesomeIcon icon={faNewspaper} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý tin tức
                                    <FontAwesomeIcon
                                        icon={openMenus.newsManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.newsManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.newsList}>Danh sách tin tức</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addNews}>Thêm tin tức</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('projectManagement')}>
                        <FontAwesomeIcon icon={faDiagramProject} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý dự án
                                    <FontAwesomeIcon
                                        icon={openMenus.projectManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.projectManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.projectList}>Danh sách dự án</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addProject}>Thêm dự án</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('serviceManagement')}>
                        <FontAwesomeIcon icon={faLayerGroup} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Dịch vụ & sản phẩm
                                    <FontAwesomeIcon
                                        icon={openMenus.serviceManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.serviceManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.serviceList}>DS dịch vụ & sản phẩm</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addService}>Thêm dịch vụ & sản phẩm</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('documentManagement')}>
                        <FontAwesomeIcon icon={faClipboardList} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý tài liệu
                                    <FontAwesomeIcon
                                        icon={openMenus.documentManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.documentManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.legalList}>Danh sách tài liệu</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addLegal}>Thêm tài liệu</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('partnerManagement')}>
                        <FontAwesomeIcon icon={faHandshake} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý đối tác
                                    <FontAwesomeIcon
                                        icon={openMenus.partnerManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.partnerManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.partnerList}>Danh sách đối tác</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addPartner}>Thêm đối tác</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('libraryManagement')}>
                        <FontAwesomeIcon icon={faBookOpen} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý thư viện
                                    <FontAwesomeIcon
                                        icon={openMenus.libraryManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.libraryManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.videosList}>Danh sách video</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addVideo}>Thêm video</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.imagesList}>Danh sách hình ảnh</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addImage}>Thêm hình ảnh</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('aboutManagement')}>
                        <FontAwesomeIcon icon={faInfoCircle} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý trang
                                    <FontAwesomeIcon
                                        icon={openMenus.aboutManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.aboutManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.pageList}>Danh sách trang</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addPage}>Thêm trang</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className={styles.menuItem} onClick={() => toggleMenu('teamManagement')}>
                        <FontAwesomeIcon icon={faUserFriends} className={styles.menuIcon} />
                        <span className={styles.menuText}>
                            {!isCollapsed && (
                                <>
                                    Quản lý đội ngũ
                                    <FontAwesomeIcon
                                        icon={openMenus.teamManagement ? faChevronDown : faChevronRight}
                                        className={styles.chevronIcon}
                                    />
                                </>
                            )}
                        </span>
                    </div>
                    <ul className={`${styles.subMenu} ${openMenus.teamManagement ? styles.open : ''}`}>
                        <li>
                            <NavLink to={routes.departmentList}>Danh sách phòng ban</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addDepartment}>Thêm phòng ban</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.memberList}>Danh sách đội ngũ</NavLink>
                        </li>
                        <li>
                            <NavLink to={routes.addMember}>Thêm đội ngũ</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink to={routes.settings} className={styles.menuItem}>
                        <FontAwesomeIcon icon={faCogs} className={styles.menuIcon} />
                        <span className={styles.menuText}>{!isCollapsed && 'Cài đặt'}</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
