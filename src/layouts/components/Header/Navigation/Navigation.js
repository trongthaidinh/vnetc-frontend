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
    const [openSubSubMenus, setOpenSubSubMenus] = useState({});

    useEffect(() => {
        const fetchNavigationLinks = async () => {
            try {
                const links = await getNavigationLinks();
                const sortedLinks = links.sort((a, b) => a.position - b.position);
                setNavigationLinks(sortedLinks);
            } catch (error) {
                setError(error);
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

    const toggleSubMenu = (id, fromChild = false) => {
        if (!fromChild) {
            setOpenSubMenus((prevState) => ({
                ...prevState,
                [id]: !prevState[id],
            }));
        }
    };

    const toggleSubSubMenu = (parentId, childId) => {
        setOpenSubSubMenus((prevState) => ({
            ...prevState,
            [`${parentId}-${childId}`]: !prevState[`${parentId}-${childId}`],
        }));
    };

    const handleMouseEnter = (id) => {
        if (window.innerWidth >= 1280) {
            setOpenSubMenus((prevState) => ({
                ...prevState,
                [id]: true,
            }));
        }
    };

    const handleMouseLeave = (id) => {
        if (window.innerWidth >= 1280) {
            setOpenSubMenus((prevState) => ({
                ...prevState,
                [id]: false,
            }));
        }
    };

    const handleMouseEnterChild = (parentId, childId) => {
        if (window.innerWidth >= 1280) {
            setOpenSubSubMenus((prevState) => ({
                ...prevState,
                [`${parentId}-${childId}`]: true,
            }));
        }
    };

    const handleMouseLeaveChild = (parentId, childId) => {
        if (window.innerWidth >= 1280) {
            setOpenSubSubMenus((prevState) => ({
                ...prevState,
                [`${parentId}-${childId}`]: false,
            }));
        }
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
                        <div className={cx('menu-item')}>
                            <NavLink end to="/" className={({ isActive }) => cx({ 'active-link': isActive })}>
                                <div className={cx('item-icon')}>Trang Chủ</div>
                            </NavLink>
                        </div>
                    </li>
                    {navigationLinks.map((link) => {
                        const sortedChilds = (link.childs || []).sort((a, b) => a.position - b.position);
                        return (
                            <li
                                key={link._id}
                                className={cx({ 'has-children': sortedChilds.length > 0 })}
                                onMouseEnter={() => handleMouseEnter(link._id)}
                                onMouseLeave={() => handleMouseLeave(link._id)}
                                onClick={() => toggleSubMenu(link._id)}
                            >
                                <div className={cx('menu-item')}>
                                    <NavLink
                                        end
                                        to={`/${link.slug}`}
                                        className={({ isActive }) => cx({ 'active-link': isActive })}
                                        onClick={handleLinkClick}
                                    >
                                        <div className={cx('item-icon')}>{link.title}</div>
                                    </NavLink>
                                    {sortedChilds.length > 0 && (
                                        <FontAwesomeIcon
                                            icon={openSubMenus[link._id] ? faChevronDown : faChevronRight}
                                            className={cx('submenu-icon')}
                                        />
                                    )}
                                </div>
                                {sortedChilds.length > 0 && (
                                    <ul className={cx('dropdown', { open: openSubMenus[link._id] })}>
                                        {sortedChilds.map((childLink) => {
                                            const sortedSubChilds = (childLink.child || []).sort(
                                                (a, b) => a.position - b.position,
                                            );
                                            return (
                                                <li
                                                    key={childLink._id}
                                                    className={cx({
                                                        'has-sub-children': sortedSubChilds.length > 0,
                                                    })}
                                                    onMouseEnter={() => handleMouseEnterChild(link._id, childLink._id)}
                                                    onMouseLeave={() => handleMouseLeaveChild(link._id, childLink._id)}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                                                        toggleSubSubMenu(link._id, childLink._id);
                                                    }}
                                                >
                                                    <div className={cx('sub-link-wrapper')}>
                                                        <NavLink
                                                            to={`/${link.slug}/${childLink.slug}`}
                                                            className={({ isActive }) =>
                                                                cx({ 'active-link': isActive })
                                                            }
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                                                                handleLinkClick();
                                                            }}
                                                        >
                                                            {childLink.title}
                                                        </NavLink>
                                                        {sortedSubChilds.length > 0 && (
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    openSubSubMenus[`${link._id}-${childLink._id}`]
                                                                        ? faChevronDown
                                                                        : faChevronRight
                                                                }
                                                                className={cx('submenu-icon')}
                                                            />
                                                        )}
                                                    </div>
                                                    {sortedSubChilds.length > 0 && (
                                                        <ul
                                                            className={cx('dropdown-second-level', {
                                                                open: openSubSubMenus[`${link._id}-${childLink._id}`],
                                                            })}
                                                        >
                                                            {sortedSubChilds.map((subChildLink) => {
                                                                return (
                                                                    <li key={subChildLink._id}>
                                                                        <NavLink
                                                                            to={`/${link.slug}/${childLink.slug}/${subChildLink.slug}`}
                                                                            className={({ isActive }) =>
                                                                                cx({ 'active-link': isActive })
                                                                            }
                                                                            onClick={(e) => {
                                                                                e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                                                                                handleLinkClick();
                                                                            }}
                                                                        >
                                                                            {subChildLink.title}
                                                                        </NavLink>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <Search />
            </div>
        </div>
    );
}

export default Navigation;
