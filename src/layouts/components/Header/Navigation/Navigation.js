import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { getNavigationLinks } from '~/services/navigationService';
import styles from './Navigation.module.scss';
import Search from '~/layouts/components/Search';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Navigation({ isFixed }) {
    const [navigationLinks, setNavigationLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenus, setOpenSubMenus] = useState({});

    useEffect(() => {
        const fetchNavigationLinks = async () => {
            try {
                const links = await getNavigationLinks();
                //     {
                //         _id: '6671b495255a57dd268763c3',
                //         title: 'Giới thiệu',
                //         slug: 'about',
                //         childs: [
                //             {
                //                 _id: '6671b530255a57dd268763e0',
                //                 title: 'Tổng quan',
                //                 slug: 'introduction',
                //                 parentNavId: '6671b495255a57dd268763c3',
                //             },
                //             {
                //                 _id: '6671b571255a57dd268763e5',
                //                 title: 'Lịch sử phát triển',
                //                 slug: 'history',
                //                 parentNavId: '6671b495255a57dd268763c3',
                //             },
                //             {
                //                 _id: '6671b583255a57dd268763ea',
                //                 title: 'Sơ đồ tổ chức',
                //                 slug: 'organizational',
                //                 parentNavId: '6671b495255a57dd268763c3',
                //             },
                //             {
                //                 _id: '6671b5b2255a57dd268763ef',
                //                 title: 'Tầm nhìn - Sứ mệnh - Giá trị',
                //                 slug: 'vision-mission-values',
                //                 parentNavId: '6671b495255a57dd268763c3',
                //             },
                //             {
                //                 _id: '6671b5df255a57dd268763f4',
                //                 title: 'Hồ sơ năng lực',
                //                 slug: 'capacity-profile',
                //                 parentNavId: '6671b495255a57dd268763c3',
                //             },
                //             {
                //                 _id: '6671b5ec255a57dd268763f9',
                //                 title: 'Mục tiêu chất lượng',
                //                 slug: 'quality-goals',
                //                 parentNavId: '6671b495255a57dd268763c3',
                //             },
                //         ],
                //     },
                //     {
                //         _id: '6671b4b7255a57dd268763c7',
                //         title: 'Tin tức',
                //         slug: 'news',
                //         childs: [
                //             {
                //                 _id: '6671b603255a57dd268763fe',
                //                 title: 'Tin nghành',
                //                 slug: 'industry-news',
                //                 parentNavId: '6671b4b7255a57dd268763c7',
                //             },
                //             {
                //                 _id: '6671b61b255a57dd26876403',
                //                 title: 'Tin kinh tế - xã hội',
                //                 slug: 'social-economic-news',
                //                 parentNavId: '6671b4b7255a57dd268763c7',
                //             },
                //         ],
                //     },
                //     {
                //         _id: '6671b4c0255a57dd268763cb',
                //         title: 'Sản phẩm',
                //         slug: 'products',
                //         childs: [
                //             {
                //                 _id: '6671b636255a57dd26876408',
                //                 title: 'Máy biến áp lực',
                //                 slug: 'pressure-transformers',
                //                 parentNavId: '6671b4c0255a57dd268763cb',
                //             },
                //             {
                //                 _id: '6671b640255a57dd2687640d',
                //                 title: 'Máy phát điện',
                //                 slug: 'generators',
                //                 parentNavId: '6671b4c0255a57dd268763cb',
                //             },
                //             {
                //                 _id: '6671b65f255a57dd26876412',
                //                 title: 'Máy điện động',
                //                 slug: 'electric-machines',
                //                 parentNavId: '6671b4c0255a57dd268763cb',
                //             },
                //             {
                //                 _id: '6671b67a255a57dd26876417',
                //                 title: 'Máy cắt điện cao áp, hạ áp',
                //                 slug: 'high-low-voltage-cutting-machines',
                //                 parentNavId: '6671b4c0255a57dd268763cb',
                //             },
                //             {
                //                 _id: '6671b683255a57dd2687641c',
                //                 title: 'Tụ điện',
                //                 slug: 'capacitors',
                //                 parentNavId: '6671b4c0255a57dd268763cb',
                //             },
                //             {
                //                 _id: '6671b68d255a57dd26876421',
                //                 title: 'Kháng điện',
                //                 slug: 'resistors',
                //                 parentNavId: '6671b4c0255a57dd268763cb',
                //             },
                //         ],
                //     },
                //     {
                //         _id: '6671b4ce255a57dd268763cf',
                //         title: 'Dịch vụ',
                //         slug: 'services',
                //         childs: [
                //             {
                //                 _id: '6671b69f255a57dd26876426',
                //                 title: 'Kiểm định',
                //                 slug: 'inspection',
                //                 parentNavId: '6671b4ce255a57dd268763cf',
                //             },
                //             {
                //                 _id: '6671b6b0255a57dd2687642b',
                //                 title: 'Thử nghiệm',
                //                 slug: 'testing',
                //                 parentNavId: '6671b4ce255a57dd268763cf',
                //             },
                //             {
                //                 _id: '6671b6ba255a57dd26876430',
                //                 title: 'Hiệu chuẩn',
                //                 slug: 'calibration',
                //                 parentNavId: '6671b4ce255a57dd268763cf',
                //             },
                //         ],
                //     },
                //     {
                //         _id: '6671b4db255a57dd268763d3',
                //         title: 'Dự án và năng lực',
                //         slug: 'projects',
                //         childs: [
                //             {
                //                 _id: '6671b6dd255a57dd26876435',
                //                 title: 'Dự án đang thực hiện',
                //                 slug: 'ongoing-projects',
                //                 parentNavId: '6671b4db255a57dd268763d3',
                //             },
                //             {
                //                 _id: '6671b6ed255a57dd2687643a',
                //                 title: 'Dự án đã thực hiện',
                //                 slug: 'completed-projects',
                //                 parentNavId: '6671b4db255a57dd268763d3',
                //             },
                //             {
                //                 _id: '6671b6f9255a57dd2687643f',
                //                 title: 'Dự án đầu tư',
                //                 slug: 'investment-projects',
                //                 parentNavId: '6671b4db255a57dd268763d3',
                //             },
                //             {
                //                 _id: '6671b70e255a57dd26876444',
                //                 title: 'Dây chuyền công nghệ',
                //                 slug: 'technology-lines',
                //                 parentNavId: '6671b4db255a57dd268763d3',
                //             },
                //             {
                //                 _id: '6671b727255a57dd26876449',
                //                 title: 'Máy móc, thiết bị',
                //                 slug: 'machinery-equipment',
                //                 parentNavId: '6671b4db255a57dd268763d3',
                //             },
                //         ],
                //     },
                //     {
                //         _id: '6671b4e6255a57dd268763d7',
                //         title: 'Đội ngũ',
                //         slug: 'teams',
                //         childs: [
                //             {
                //                 _id: '6671b749255a57dd2687644e',
                //                 title: 'Ban lãnh đạo',
                //                 slug: 'leadership-team',
                //                 parentNavId: '6671b4e6255a57dd268763d7',
                //             },
                //             {
                //                 _id: '6671b757255a57dd26876453',
                //                 title: 'Đội công trình',
                //                 slug: 'construction-team',
                //                 parentNavId: '6671b4e6255a57dd268763d7',
                //             },
                //         ],
                //     },
                //     {
                //         _id: '6671b4ef255a57dd268763db',
                //         title: 'Liên hệ',
                //         slug: 'contact',
                //         childs: [],
                //     },
                // ];
                setNavigationLinks(links);
            } catch (error) {
                setError(error);
                setLoading(false);
                console.error('Error fetching navigation links:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNavigationLinks();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    };

    const toggleSubMenu = (id) => {
        setOpenSubMenus((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className={cx('wrapper', { fixed: isFixed })}>
            <div className={cx('inner')}>
                <div className={cx('mobile-menu-icon')} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>
                <ul className={cx('navigation-links', { open: isMenuOpen })}>
                    <li onClick={handleLinkClick}>
                        <NavLink end to="/" className={({ isActive }) => cx({ 'active-link': isActive })}>
                            Trang Chủ
                        </NavLink>
                    </li>
                    {navigationLinks.map((link) => (
                        <li key={link._id} className={cx({ 'has-children': link.childs.length > 0 })}>
                            <div className={cx('menu-item')}>
                                <NavLink
                                    end
                                    to={`/${link.slug}`}
                                    className={({ isActive }) => cx({ 'active-link': isActive })}
                                    onClick={handleLinkClick}
                                >
                                    {link.title}
                                </NavLink>
                                {link.childs.length > 0 && (
                                    <FontAwesomeIcon
                                        icon={openSubMenus[link.id] ? faChevronDown : faChevronRight}
                                        className={cx('submenu-icon')}
                                        onClick={() => toggleSubMenu(link._id)}
                                    />
                                )}
                            </div>
                            {link.childs.length > 0 && (
                                <ul className={cx('dropdown', { open: openSubMenus[link._id] })}>
                                    {link.childs.map((childLink) => (
                                        <li key={childLink._id} onClick={handleLinkClick}>
                                            <NavLink
                                                to={`/${link.slug}/${childLink.slug}`}
                                                className={({ isActive }) => cx({ 'active-link': isActive })}
                                                onClick={toggleMenu}
                                            >
                                                {childLink.title}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <Search />
            </div>
        </div>
    );
}

export default Navigation;
