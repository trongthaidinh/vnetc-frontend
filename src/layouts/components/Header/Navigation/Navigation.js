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
