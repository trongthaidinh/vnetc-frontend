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
                console.error('Error fetching navigation links:', error);
            }
        };

        fetchNavigationLinks();
    }, []);

    if (navigationLinks.length === 0) {
        return null;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ul className={cx('navigation-links')}>
                    <li>
                        <NavLink exact to="/" activeClassName={cx('active-link')}>
                            Trang Chủ
                        </NavLink>
                    </li>
                    {navigationLinks.map((link) => (
                        <li key={link._id} className={cx({ 'has-children': link.childs.length > 0 })}>
                            <NavLink exact to={`/${link.slug}`} activeClassName={cx('active-link')}>
                                {link.title}
                            </NavLink>
                            {link.childs.length > 0 && (
                                <ul className={cx('dropdown')}>
                                    {link.childs.map((childLink) => (
                                        <li key={childLink._id}>
                                            <NavLink
                                                to={`/${link.slug}/${childLink.slug}`}
                                                activeClassName={cx('active-link')}
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
