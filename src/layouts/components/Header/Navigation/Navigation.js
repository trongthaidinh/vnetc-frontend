import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { getNavigationLinks, getChildNavigation } from '~/services/navigationService';
import styles from './Navigation.module.scss';
import Search from '~/layouts/components/Search';

const cx = classNames.bind(styles);

function Navigation() {
    const [navigationLinks, setNavigationLinks] = useState([]);
    const [childLinks, setChildLinks] = useState({});

    useEffect(() => {
        const fetchNavigationLinks = async () => {
            try {
                const links = await getNavigationLinks();
                setNavigationLinks(links);
            } catch (error) {
                console.error('Error fetching navigation links:', error);
            }
        };

        fetchNavigationLinks();
    }, []);

    const handleMouseEnter = async (parentNavigationId) => {
        if (!childLinks[parentNavigationId]) {
            try {
                const children = await getChildNavigation(parentNavigationId);
                setChildLinks((prevChildLinks) => ({
                    ...prevChildLinks,
                    [parentNavigationId]: children,
                }));
            } catch (error) {
                console.error('Error fetching child navigation:', error);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ul className={cx('navigation-links')}>
                    <li>
                        <NavLink exact="true" to="/" activeclassname={cx('active-link')}>
                            Trang Chủ
                        </NavLink>
                    </li>
                    {navigationLinks.map((link) => (
                        <li
                            key={link.id}
                            onMouseEnter={() => handleMouseEnter(link.id)}
                            className={cx({ 'has-children': !!childLinks[link.id] })}
                        >
                            <NavLink exact="true" to={link.path} activeclassname={cx('active-link')}>
                                {link.name}
                            </NavLink>
                            {childLinks[link.id] && (
                                <ul className={cx('dropdown')}>
                                    {childLinks[link.id].map((childLink) => (
                                        <li key={childLink.id}>
                                            <NavLink to={childLink.path} activeclassname={cx('active-link')}>
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
