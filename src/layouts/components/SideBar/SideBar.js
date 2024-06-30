import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import styles from './SideBar.module.scss';
import Menu, { MenuItem } from './Menu';
import { getNavigationLinks } from '~/services/navigationService';

const cx = classNames.bind(styles);

function SideBar() {
    const [navigationData, setNavigationData] = useState([]);

    useEffect(() => {
        async function fetchNavigationData() {
            try {
                const data = await getNavigationLinks();
                setNavigationData(data);
            } catch (error) {
                console.error('Error fetching navigation data:', error);
            }
        }

        fetchNavigationData();
    }, []);

    const renderMenuItems = () => {
        const currentSlug = window.location.pathname.split('/')[1];

        const currentNav = navigationData.find((nav) => nav.slug === currentSlug);

        if (!currentNav) {
            return <MenuItem title="Default Title" to="/default" icon={<FontAwesomeIcon icon={faCircleDot} />} />;
        }

        return currentNav.childs.map((child) => (
            <MenuItem
                key={child.id}
                title={child.title}
                to={`/${currentSlug}/${child.slug}`}
                icon={<FontAwesomeIcon icon={faCircleDot} />}
            />
        ));
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>{renderMenuItems()}</Menu>
        </aside>
    );
}

export default SideBar;
