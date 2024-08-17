import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { getNavigationLinks } from '~/services/navigationService';
import styles from './Navigation.module.scss';
import Search from '~/layouts/components/Search';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faTimes,
    faChevronRight,
    faChevronDown,
    faInfoCircle,
    faBox,
    faLayerGroup,
    faProjectDiagram,
    faNewspaper,
    faUsers,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const iconsData = [
    { position: 1, icon: faInfoCircle },
    { position: 2, icon: faBox },
    { position: 3, icon: faLayerGroup },
    { position: 4, icon: faProjectDiagram },
    { position: 5, icon: faNewspaper },
    { position: 6, icon: faUsers },
    { position: 7, icon: faEnvelope },
];

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

    const handleLinkClick = (id) => {
        if (isMenuOpen) {
            toggleMenu();
        }
    };

    const toggleSubMenu = (id) => {
        if (window.innerWidth < 1280) {
            setOpenSubMenus((prevState) => ({
                ...prevState,
                [id]: !prevState[id],
            }));
        }
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
                        const iconData = iconsData.find((icon) => icon.position === link.position);
                        const sortedChilds = link.childs.sort((a, b) => a.position - b.position);
                        return (
                            <li
                                key={link._id}
                                className={cx({ 'has-children': link.childs.length > 0 })}
                                onMouseEnter={() => handleMouseEnter(link._id)} // Hover event
                                onMouseLeave={() => handleMouseLeave(link._id)} // Leave event
                                onClick={() => toggleSubMenu(link._id)} // Click event for mobile
                            >
                                <div className={cx('menu-item')}>
                                    <NavLink
                                        end
                                        to={`/${link.slug}`}
                                        className={({ isActive }) => cx({ 'active-link': isActive })}
                                        onClick={handleLinkClick}
                                    >
                                        <div className={cx('item-icon')}>
                                            {iconData && (
                                                <FontAwesomeIcon icon={iconData.icon} className={cx('nav-icon')} />
                                            )}
                                            {link.title}
                                        </div>
                                    </NavLink>
                                    {link.childs.length > 0 && (
                                        <FontAwesomeIcon
                                            icon={openSubMenus[link._id] ? faChevronDown : faChevronRight}
                                            className={cx('submenu-icon')}
                                        />
                                    )}
                                </div>
                                {link.childs.length > 0 && (
                                    <ul className={cx('dropdown', { open: openSubMenus[link._id] })}>
                                        {sortedChilds.map((childLink) => (
                                            <li key={childLink._id}>
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
                        );
                    })}
                </ul>
                <Search />
            </div>
        </div>
    );
}

export default Navigation;
