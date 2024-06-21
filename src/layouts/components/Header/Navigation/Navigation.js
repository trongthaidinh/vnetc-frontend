// components/Navigation/Navigation.js
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { getNavigationLinks } from '~/services/navigationService';
import styles from './Navigation.module.scss';
import Search from '~/layouts/components/Search';

const cx = classNames.bind(styles);

function Navigation() {
    const [navigationLinks, setNavigationLinks] = useState([]);

    useEffect(() => {
        const fetchNavigationLinks = async () => {
            try {
                const links = await getNavigationLinks();
                setNavigationLinks(links);
            } catch (error) {
                // Handle error appropriately in your application
            }
        };

        fetchNavigationLinks();
    }, []);

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
                        <li key={link.path}>
                            <NavLink exact="true" to={link.path} activeclassname={cx('active-link')}>
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <Search />
            </div>
        </div>
    );
}

export default Navigation;
