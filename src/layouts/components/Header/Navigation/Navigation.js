import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { getNavigationLinks } from '~/services/navigationService';
import styles from './Navigation.module.scss';
import Search from '~/layouts/components/Search';
import PushNotification from '~/components/PushNotification';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(styles);

function Navigation() {
    const [navigationLinks, setNavigationLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ul className={cx('navigation-links')}>
                    <li>
                        <NavLink end to="/" className={({ isActive }) => cx({ 'active-link': isActive })}>
                            Trang Chủ
                        </NavLink>
                    </li>
                    {navigationLinks.map((link) => (
                        <li key={link._id} className={cx({ 'has-children': link.childs.length > 0 })}>
                            <NavLink
                                end
                                to={`/${link.slug}`}
                                className={({ isActive }) => cx({ 'active-link': isActive })}
                            >
                                {link.title}
                            </NavLink>
                            {link.childs.length > 0 && (
                                <ul className={cx('dropdown')}>
                                    {link.childs.map((childLink) => (
                                        <li key={childLink._id}>
                                            <NavLink
                                                to={`/${link.slug}/${childLink.slug}`}
                                                className={({ isActive }) => cx({ 'active-link': isActive })}
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
